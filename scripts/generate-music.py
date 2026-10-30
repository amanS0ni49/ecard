"""
Original royalty-free instrumental for the invitation — a modern cinematic
wedding cue: felt-piano arpeggios and a warm pad over the I-V-vi-IV
progression, with a soft pluck counter-melody. Pure-Python synthesis, so the
result carries no third-party rights.
"""
import math
import random
import struct
import wave

SR = 22050
BPM = 74.0
BEAT = 60.0 / BPM
BARS = 8
LOOP = BARS * 4 * BEAT          # 8 bars of 4/4
TAIL = 2.0                      # rendered past the loop, folded back over the head
TOTAL = LOOP + TAIL
N = int(TOTAL * SR)

random.seed(20261120)           # the wedding date — keeps renders reproducible
buf = [0.0] * N


def add(samples, start, gain=1.0):
    i = int(start * SR)
    for s in samples:
        if 0 <= i < N:
            buf[i] += s * gain
        i += 1


def piano(freq, dur, gain=1.0):
    """Felt-piano-ish: a few detuned partials under a fast percussive attack."""
    n = int(dur * SR)
    out = [0.0] * n
    partials = ((1.0, 1.0), (2.0, 0.40), (3.0, 0.16), (4.01, 0.08), (5.0, 0.04))
    for mult, amp in partials:
        w = 2 * math.pi * freq * mult / SR
        decay = math.exp(-3.1 * mult ** 0.55 / SR)
        env = amp
        for k in range(n):
            out[k] += env * math.sin(w * k)
            env *= decay
    # hammer thump at the attack
    atk = int(0.006 * SR)
    for k in range(min(atk, n)):
        out[k] += random.uniform(-0.3, 0.3) * (1 - k / atk)
    # short fade so notes never click
    rel = max(1, int(n * 0.12))
    for k in range(rel):
        out[n - rel + k] *= 1 - k / rel
    return [v * gain for v in out]


def pad(freqs, dur, gain=1.0):
    """Warm sustained bed with a slow swell."""
    n = int(dur * SR)
    out = [0.0] * n
    for f in freqs:
        for det in (-0.6, 0.0, 0.7):
            w = 2 * math.pi * (f + det) / SR
            for k in range(n):
                out[k] += math.sin(w * k)
    atk, rel = int(n * 0.28), int(n * 0.42)
    for k in range(n):
        e = 1.0
        if k < atk:
            e = k / atk
        elif k > n - rel:
            e = (n - k) / rel
        out[k] *= e
    norm = gain / (len(freqs) * 3)
    return [v * norm for v in out]


# ---- harmony: I - V - vi - IV in D major, the modern wedding progression --
def nt(semi, octave=4):
    """Equal-tempered pitch, semitones from D, with D4 = 293.66 Hz."""
    return 293.66 * (2 ** (octave - 4)) * (2 ** (semi / 12))


CHORDS = [
    # (root semitone from D, chord tones as semitones, bass)
    (0, [0, 4, 7], -12),        # D   (I)
    (7, [7, 11, 14], -5),       # A   (V)
    (9, [9, 12, 16], -3),       # Bm  (vi)
    (5, [5, 9, 12], -7),        # G   (IV)
]

for bar in range(BARS + 1):
    t = bar * 4 * BEAT
    semi_root, tones, bass = CHORDS[bar % 4]

    # pad bed across the bar
    add(pad([nt(s, 4) for s in tones], 4 * BEAT * 1.05, 0.30), t)
    add(pad([nt(bass, 3)], 4 * BEAT * 1.05, 0.22), t)

    # left-hand root on beats 1 and 3
    add(piano(nt(bass, 3), 2.0, 0.42), t)
    add(piano(nt(bass, 3), 2.0, 0.26), t + 2 * BEAT)

    # right-hand arpeggio, eighth notes rolling up and back down
    shape = [0, 1, 2, 1, 2, 1, 0, 1]
    for i, deg in enumerate(shape):
        oct_up = 5 if i >= 4 else 4
        add(piano(nt(tones[deg], oct_up), 1.5, 0.21), t + i * 0.5 * BEAT)

# ---- a simple singable melody over the top ------------------------------
MEL = [
    (9, 1.0), (7, 1.0), (4, 2.0),
    (7, 1.0), (9, 1.0), (11, 2.0),
    (12, 1.5), (11, 0.5), (9, 2.0),
    (7, 1.0), (4, 1.0), (2, 2.0),
    (4, 1.0), (7, 1.0), (9, 2.0),
    (11, 1.0), (12, 1.0), (14, 2.0),
    (12, 1.5), (11, 0.5), (9, 2.0),
    (7, 2.0), (0, 2.0),
]

t = 0.0
for semi, beats in MEL:
    add(piano(nt(semi, 5), beats * BEAT * 1.25, 0.30), t)
    t += beats * BEAT

# ---- soft echo, standing in for hall reverb ------------------------------
delay = int(BEAT * 0.75 * SR)
for i in range(delay, N):
    buf[i] += buf[i - delay] * 0.20

# ---- seamless loop: crossfade the tail back over the head ---------------
loop_n = int(LOOP * SR)
fade_n = int(TAIL * SR)
for k in range(fade_n):
    w = k / fade_n
    buf[k] = buf[k] * w + buf[loop_n + k] * (1 - w)
buf = buf[:loop_n]

# ---- normalise, soften, write -------------------------------------------
peak = max(abs(v) for v in buf) or 1.0
scale = 0.78 / peak
frames = bytearray()
for v in buf:
    s = math.tanh(v * scale * 1.1)
    frames += struct.pack("<h", int(max(-1.0, min(1.0, s)) * 32767))

with wave.open("/home/memorres-dev/ecard/public/audio/wedding-theme.wav", "wb") as f:
    f.setnchannels(1)
    f.setsampwidth(2)
    f.setframerate(SR)
    f.writeframes(bytes(frames))

print(f"wrote {loop_n / SR:.1f}s loop, {len(frames) / 1024:.0f} KB")

# Regenerate with:  python3 scripts/generate-music.py

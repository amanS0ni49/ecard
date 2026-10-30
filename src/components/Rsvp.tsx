"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, MessageCircle, Phone, Send } from "lucide-react";
import { events, host } from "@/lib/data";
import { SectionTitle } from "./Ornaments";

type Attending = "yes" | "no";

const fieldClass =
  "w-full rounded-md border border-gold/30 bg-white/70 px-4 py-3 text-base text-ink placeholder:text-ink-mute/60 outline-none transition-colors focus:border-gold focus:bg-white";

export default function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attending>("yes");
  const [guests, setGuests] = useState(1);
  const [picked, setPicked] = useState<string[]>(events.map((e) => e.id));
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const toggleEvent = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  // The form never touches a server — it hands a ready-to-send note to WhatsApp.
  const message = useMemo(() => {
    const chosen = events.filter((e) => picked.includes(e.id)).map((e) => e.name);
    const lines = [
      `Namaste! RSVP for Avi & Guddu's wedding.`,
      ``,
      `Name: ${name || "—"}`,
      attending === "yes"
        ? `Attending: Yes (${guests} ${guests === 1 ? "guest" : "guests"})`
        : `Attending: Unable to make it`,
    ];
    if (attending === "yes" && chosen.length) lines.push(`Events: ${chosen.join(", ")}`);
    if (note.trim()) lines.push(``, `Message: ${note.trim()}`);
    return lines.join("\n");
  }, [name, attending, guests, picked, note]);

  const waHref = `https://wa.me/${host.phones[0].tel.replace("+", "")}?text=${encodeURIComponent(message)}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    window.open(waHref, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="rsvp" className="relative bg-powder-100 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <SectionTitle kicker="Will you be there?" title="RSVP">
          Let the family know you are coming — it opens WhatsApp with your reply ready to send.
        </SectionTitle>

        <div className="card-paper relative overflow-hidden rounded-xl px-6 py-9 sm:px-10 sm:py-11">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="done"
                className="flex flex-col items-center py-8 text-center"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className="flex size-16 items-center justify-center rounded-full bg-gold/15 text-gold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                >
                  <Check className="size-8" strokeWidth={1.8} />
                </motion.span>
                <p className="font-script mt-5 text-4xl text-ink">Thank you!</p>
                <p className="mt-2 max-w-sm text-base text-ink-soft italic">
                  Your reply is waiting in WhatsApp — just hit send. We cannot wait to
                  celebrate with you.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="font-label mt-7 cursor-pointer text-[0.55rem] text-gold underline-offset-4 hover:underline"
                >
                  Send another reply
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div>
                  <label htmlFor="rsvp-name" className="font-label block text-[0.55rem] text-gold">
                    Your name
                  </label>
                  <input
                    id="rsvp-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name as you would like it announced"
                    required
                    className={`mt-2 ${fieldClass}`}
                  />
                </div>

                <div>
                  <span className="font-label block text-[0.55rem] text-gold">
                    Will you join us?
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {(
                      [
                        ["yes", "Joyfully accept"],
                        ["no", "Regretfully decline"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setAttending(value)}
                        aria-pressed={attending === value}
                        className={`cursor-pointer rounded-md border px-4 py-3 text-sm transition-colors sm:text-base ${
                          attending === value
                            ? "border-gold bg-gold/12 text-ink"
                            : "border-gold/25 bg-white/60 text-ink-mute hover:border-gold/50"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {attending === "yes" && (
                    <motion.div
                      className="space-y-6 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div>
                        <label
                          htmlFor="rsvp-guests"
                          className="font-label block text-[0.55rem] text-gold"
                        >
                          How many of you?
                        </label>
                        <div className="mt-2 flex items-center gap-4">
                          <input
                            id="rsvp-guests"
                            type="range"
                            min={1}
                            max={10}
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-gold/25 accent-gold"
                          />
                          <span className="font-display w-10 text-center text-2xl font-semibold text-ink tabular-nums">
                            {guests}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="font-label block text-[0.55rem] text-gold">
                          Which celebrations?
                        </span>
                        <div className="mt-2 space-y-2.5">
                          {events.map((ev) => {
                            const on = picked.includes(ev.id);
                            return (
                              <button
                                key={ev.id}
                                type="button"
                                onClick={() => toggleEvent(ev.id)}
                                aria-pressed={on}
                                className={`flex w-full cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
                                  on
                                    ? "border-gold bg-gold/12"
                                    : "border-gold/25 bg-white/60 hover:border-gold/50"
                                }`}
                              >
                                <span
                                  className={`flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${
                                    on ? "border-gold bg-gold text-cream-100" : "border-gold/40"
                                  }`}
                                >
                                  {on && <Check className="size-3.5" strokeWidth={2.4} />}
                                </span>
                                <span className="text-sm text-ink sm:text-base">
                                  <span className="font-display font-semibold">{ev.name}</span>
                                  <span className="block text-ink-mute">
                                    {ev.day}, {ev.date} · {ev.city}
                                  </span>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label htmlFor="rsvp-note" className="font-label block text-[0.55rem] text-gold">
                    A note for the couple
                  </label>
                  <textarea
                    id="rsvp-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder="Blessings, wishes, song requests…"
                    className={`mt-2 resize-none ${fieldClass}`}
                  />
                </div>

                <button
                  type="submit"
                  className="font-label group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-4 text-[0.6rem] text-cream-100 transition-colors hover:bg-gold disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!name.trim()}
                >
                  <Send className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
                  Send RSVP on WhatsApp
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* direct lines to the hosts, straight off the card */}
        <div className="mt-10 text-center">
          <p className="font-label text-[0.55rem] text-gold">Or call the family</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {host.phones.map((p) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/60 px-5 py-2.5 text-base text-ink transition-colors hover:bg-gold hover:text-cream-100"
              >
                <Phone className="size-4" strokeWidth={1.6} />
                {p.display}
              </a>
            ))}
            <a
              href={`https://wa.me/${host.phones[0].tel.replace("+", "")}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/60 px-5 py-2.5 text-base text-ink transition-colors hover:bg-gold hover:text-cream-100"
            >
              <MessageCircle className="size-4" strokeWidth={1.6} />
              WhatsApp
            </a>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-base text-ink-mute italic">
            <Heart className="size-3.5 text-rose" fill="currentColor" strokeWidth={0} />
            Your blessings are the only gift we need
          </p>
        </div>
      </div>
    </section>
  );
}

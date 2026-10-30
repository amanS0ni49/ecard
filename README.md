# Avi & Guddu — Interactive Wedding E‑Card

An animated, single-page wedding invitation built from the printed
*Avi – Guddu* card. Every name, date, address and phone number on the site is
taken verbatim from that PDF; the decorative artwork (Ganesha, marigold
garlands, swastik, lotus badge, Jaipur garden band, dholak, dancing couple) was
extracted straight out of it so the site and the card match.

**No photographs anywhere on the site** — the couple are represented by
illustrated portraits.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`) |
| Animation | Framer Motion (reveals, parallax, countdown, lightbox) |
| Scroll animation | GSAP + ScrollTrigger (timeline spine, portrait entrances, art parallax) |
| Icons | lucide-react |
| Deploy | Vercel |

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build && npm start
```

## What's on the page

1. **Envelope preloader** — a sealed envelope; tapping the wax Ganesha seal runs
   a GSAP timeline (seal pops, flap swings, card rises, screen wipes). Shown
   once per browser session via `sessionStorage`. The tap is also what starts
   the music, since browsers only allow audio from a real user gesture.
2. **Hero** — Ganesha, the date block set like the printed card, both names, a
   live countdown to 20 Nov 2026, drifting marigold petals on canvas, and
   mouse/scroll parallax on the garlands and garden band.
3. **The Invitation** — the full formal wording from page 2 of the card,
   revealed line by line.
4. **The Couple** — illustrated portraits in gold medallions, with each
   person's full lineage.
5. **Our Story** — three chapters on warm paper, alternating left and right.
   A gold thread draws itself between them as you scroll (GSAP ScrollTrigger),
   each illustrated scene slides in from its own side and drifts slowly as it
   passes. Every scene hides under a gold-foil scratch panel — guests rub it
   off (or tap / press Enter) to reveal the illustration.
6. **The Festivities** — the full run-up itinerary (Vivah Hath through
   Paanigrahan Sanskar) as a grid of arched cards, each with its date pill,
   the site's own artwork and a caption, revealed with a GSAP stagger.
7. **The Celebrations** — a GSAP-drawn timeline for the Wedding (20 Nov,
   Jaipur) and Sangeet & Aashirwad Samaroh (22 Nov, Jodhpur), each with Google
   Maps directions and an "Add to Calendar" `.ics` download.
8. **Mathur Family** — every name from page 4 of the card.
9. **RSVP** — a form that composes a WhatsApp message to the host number. No
   backend, no database; the guest presses send themselves.
10. **Footer** — the "From" block, address and phone numbers.

Plus a scroll-progress rule, a share button (Web Share API with
clipboard fallback), a music toggle, and a floating nav that shows icons on
phones and labels on wider screens.

## Things you'll probably want to change

### Swap in your own portraits

The couple are shown as illustrated portraits at `public/art/groom.jpg` and
`public/art/bride.jpg` — square artwork whose own gold ring, dashed border and
lotus motifs sit on a powder ground that matches the section, so it renders
square and blends in with no extra framing.

To replace them, overwrite those two files with square images on the same
`#e1f2f7` background. Nothing in the code needs to change. If your artwork has
a transparent or differently coloured background, add a circular mask in
`Portrait` inside `src/components/Couple.tsx`.

A prompt that matches this card's palette:

> Flat vector portrait illustration of an Indian {groom in a cream embroidered
> sherwani with glasses / bride in a deep pink lehenga with maang tikka,
> jhumkas and a bindi}, bust framing, three-quarter view, inside a thin gold
> circular frame with a dashed outer ring and small lotus motifs, soft
> powder-blue background, clean minimal shapes, no text.

### Replace the story images (worth doing)

`public/story/1.jpg`–`3.jpg` were sliced out of the 489×732 story artwork and
upscaled 2×, so they are **soft** — good enough to show the layout, not good
enough to ship. Overwrite them with the full-resolution originals (roughly
1200×1000 each, landscape) and they will sharpen up with no code change.

The wording in `story` inside `src/lib/data.ts` is taken from that artwork;
edit it there.

### Swap in a licensed song

`public/audio/wedding-theme.wav` is an **original royalty-free instrumental
generated for this project** — a cinematic felt-piano cue over the I‑V‑vi‑IV
progression. It ships so the site works out of the box and carries no
third-party rights.

To use a real song instead, drop your file in `public/audio/` and change `SRC`
at the top of `src/lib/audio.ts`. An `.mp3` will be a lot smaller than the
bundled `.wav`.

One caution: popular film songs are copyrighted. For a private invitation link
shared with guests this is rarely an issue in practice, but if the page is
public, prefer a licensed track or a royalty-free one.

### Event times

The card gives a time only for the Sangeet ("7:00 PM onwards"). The Wedding is
listed as "Evening", so the calendar export assumes **5:30 PM IST**. If that's
wrong, fix `calStart` / `calEnd` on the wedding entry in `src/lib/data.ts`.

### Everything else

`src/lib/data.ts` is the single source of truth — names, lineage, elders,
events, venues, the family lists and the host block. Edit there and the whole
page follows.

## Deploying to Vercel

```bash
npx vercel --prod
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new);
the defaults are correct for Next.js.

Set one environment variable so WhatsApp and social previews use absolute URLs:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

`public/og.jpg` is the share preview — it's the printed invitation on a soft
blurred wash of its own artwork.

## Accessibility & performance notes

- Every animation checks `prefers-reduced-motion`; the envelope skips straight
  to the invitation and the petals never start.
- The countdown renders a fixed-height placeholder before it hydrates, so the
  hero doesn't shift on load.
- Swiper reads the clock while rendering, which Cache Components rejects during
  prerender, so the carousel is loaded with `ssr: false`.
- `overflow-x` is clipped on `<html>`, never on `<body>` — putting it on the
  body makes the body a scroll container and silently desyncs
  `window.scrollY` from the real scroller, breaking every scroll-driven
  animation on the page.

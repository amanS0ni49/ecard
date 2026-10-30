"use client";

/**
 * Hand-drawn flat-vector avatars for the couple — deliberately stylised
 * symbols rather than likenesses, so the card carries no photographs.
 *
 * Drop-in replacement: if you generate portrait illustrations elsewhere, save
 * them as /public/art/groom.png and /public/art/bride.png and swap these two
 * components for <Image> — the medallion in Couple.tsx needs no other change.
 */

const SKIN = "#e9bb93";
const SKIN_SHADE = "#d7a076";
const HAIR = "#2a2233";
const GOLD = "#c79a4a";
const ROSE = "#c2566a";
const ROSE_DEEP = "#a2415a";
const MARIGOLD = "#f0b429";
const MARIGOLD_DEEP = "#e2971c";
const CREAM = "#f7eeda";
const CREAM_SHADE = "#e6d6b4";

export function GroomAvatar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Illustration of the groom in a safa and sherwani"
    >
      {/* sherwani */}
      <path d="M18 200c0-36 36-57 82-57s82 21 82 57z" fill={CREAM} />
      <path d="M100 143c-46 0-82 21-82 57h26c0-30 22-48 56-50z" fill={CREAM_SHADE} />
      {/* dupatta / stole over one shoulder */}
      <path d="M122 149c22 6 38 19 46 32l-14 19-40-48z" fill={MARIGOLD} opacity="0.9" />
      {/* collar + placket */}
      <path d="M86 142h28l-14 16z" fill={CREAM_SHADE} />
      <path d="M94 158h12v42H94z" fill={CREAM_SHADE} opacity="0.75" />
      <circle cx="100" cy="172" r="2.6" fill={GOLD} />
      <circle cx="100" cy="186" r="2.6" fill={GOLD} />

      {/* neck */}
      <path d="M88 120h24v26c0 7-24 7-24 0z" fill={SKIN_SHADE} />

      {/* ears */}
      <ellipse cx="65" cy="96" rx="6" ry="9" fill={SKIN_SHADE} />
      <ellipse cx="135" cy="96" rx="6" ry="9" fill={SKIN_SHADE} />

      {/* face */}
      <path d="M100 52c20 0 34 15 34 37 0 25-15 44-34 44S66 114 66 89c0-22 14-37 34-37z" fill={SKIN} />

      {/* beard */}
      <path
        d="M68 92c0 25 14 41 32 41s32-16 32-41c3 18-1 34-10 43-6 6-14 9-22 9s-16-3-22-9c-9-9-13-25-10-43z"
        fill={HAIR}
        opacity="0.92"
      />
      <path d="M92 112h16c0 6-3 9-8 9s-8-3-8-9z" fill={ROSE_DEEP} opacity="0.55" />

      {/* glasses */}
      <g fill="none" stroke={HAIR} strokeWidth="2.4" opacity="0.88">
        <circle cx="85" cy="92" r="11" />
        <circle cx="115" cy="92" r="11" />
        <path d="M96 92h8M74 90l-8-3M126 90l8-3" strokeLinecap="round" />
      </g>
      {/* eyes + brows */}
      <path d="M80 93c3-3 7-3 10 0M110 93c3-3 7-3 10 0" fill="none" stroke={HAIR} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M77 78c5-3 11-3 15 0M108 78c5-3 11-3 15 0" fill="none" stroke={HAIR} strokeWidth="3" strokeLinecap="round" />

      {/* safa (turban) */}
      <path d="M100 30c26 0 40 17 40 34 0 6-2 10-5 12-6-14-18-21-35-21s-29 7-35 21c-3-2-5-6-5-12 0-17 14-34 40-34z" fill={MARIGOLD} />
      <path d="M64 71c8-11 21-16 36-16s28 5 36 16c-5-18-19-27-36-27S69 53 64 71z" fill={MARIGOLD_DEEP} opacity="0.75" />
      <path d="M62 68c10-8 23-12 38-12s28 4 38 12l-3 9c-10-8-22-12-35-12s-25 4-35 12z" fill={GOLD} opacity="0.55" />
      {/* kalgi plume */}
      <path d="M127 40c7-10 8-22 4-29 11 4 15 17 9 28z" fill={GOLD} />
      <path d="M129 36c4-7 5-14 3-19 6 3 8 11 4 18z" fill={MARIGOLD} opacity="0.85" />
      <circle cx="125" cy="43" r="4.5" fill={ROSE} />
      <circle cx="125" cy="43" r="1.8" fill={GOLD} />
      {/* safa tail */}
      <path d="M142 62c8 4 12 12 11 21l-12-6z" fill={MARIGOLD_DEEP} />
    </svg>
  );
}

export function BrideAvatar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Illustration of the bride in a dupatta and lehenga"
    >
      {/* choli */}
      <path d="M18 200c0-36 36-57 82-57s82 21 82 57z" fill={ROSE} />
      <path d="M100 143c-46 0-82 21-82 57h26c0-30 22-48 56-50z" fill={ROSE_DEEP} />
      <path d="M40 200c0-22 27-38 60-38s60 16 60 38" fill="none" stroke={GOLD} strokeWidth="3" opacity="0.65" />

      {/* neck */}
      <path d="M88 120h24v26c0 7-24 7-24 0z" fill={SKIN_SHADE} />

      {/* necklace */}
      <path d="M82 146c5 9 11 13 18 13s13-4 18-13" fill="none" stroke={GOLD} strokeWidth="2.6" />
      <circle cx="100" cy="161" r="4" fill={GOLD} />

      {/* hair, tucked close to the face so it reads as a centre-parted fall */}
      <path d="M67 92c0-26 15-40 33-40s33 14 33 40c0 19-2 35-5 49-3-21-4-38-4-49-7 6-41 6-48 0 0 11-1 28-4 49-3-14-5-30-5-49z" fill={HAIR} />

      {/* ears + jhumka */}
      <ellipse cx="65" cy="96" rx="6" ry="9" fill={SKIN_SHADE} />
      <ellipse cx="135" cy="96" rx="6" ry="9" fill={SKIN_SHADE} />
      <g fill={GOLD}>
        <circle cx="64" cy="106" r="3" />
        <path d="M58 109h12l-6 10z" />
        <circle cx="136" cy="106" r="3" />
        <path d="M130 109h12l-6 10z" />
      </g>

      {/* face */}
      <path d="M100 54c19 0 33 14 33 35 0 24-14 42-33 42s-33-18-33-42c0-21 14-35 33-35z" fill={SKIN} />

      {/* front hair / parting */}
      <path d="M67 84c2-18 15-30 33-30s31 12 33 30c-6-13-18-20-33-20s-27 7-33 20z" fill={HAIR} />

      {/* eyes, brows, lips */}
      <path d="M80 95c3-4 8-4 11 0M109 95c3-4 8-4 11 0" fill="none" stroke={HAIR} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M78 82c5-3 11-3 15 0M107 82c5-3 11-3 15 0" fill="none" stroke={HAIR} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M94 114h12c0 5-3 8-6 8s-6-3-6-8z" fill={ROSE_DEEP} />

      {/* bindi + maang tikka */}
      <circle cx="100" cy="72" r="3.2" fill={ROSE_DEEP} />
      <path d="M100 64V50" stroke={GOLD} strokeWidth="2" />
      <circle cx="100" cy="62" r="4" fill={GOLD} />
      <circle cx="100" cy="48" r="3" fill={GOLD} />

      {/* nath (nose ring) */}
      <g fill="none" stroke={GOLD} strokeWidth="2">
        <circle cx="86" cy="104" r="6" />
        <path d="M80 104c-8 2-13 7-15 14" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* dupatta draped over the head */}
      <path
        d="M100 38c30 0 48 22 48 50 0 8-1 15-3 21l-11-5c2-6 3-12 3-18 0-24-15-38-37-38S63 62 63 86c0 6 1 12 3 18l-11 5c-2-6-3-13-3-21 0-28 18-50 48-50z"
        fill={ROSE}
      />
      <path
        d="M100 38c30 0 48 22 48 50h-6c0-26-17-44-42-44S58 62 58 88h-6c0-28 18-50 48-50z"
        fill={GOLD}
        opacity="0.7"
      />
      <path d="M55 104l11 5-4 12-12-6z" fill={ROSE_DEEP} />
      <path d="M145 104l-11 5 4 12 12-6z" fill={ROSE_DEEP} />
    </svg>
  );
}

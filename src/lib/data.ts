/**
 * Every word on this page comes from the printed Avi–Guddu invitation.
 * Keep this file as the single source of truth so the card and the site never drift.
 */

/** Illustrated portraits, not photographs — see /public/art. */
export const couple = {
  groom: {
    short: "Avi",
    formal: "Bhavesh",
    role: "The Groom",
    initial: "A",
    portrait: "/art/groom.jpg",
    lineage: [
      "Son of Smt. Vandana & Shri Praveen Rai",
      "Maternal Grand S/o Smt. Rajrani Ji & Late Shri Shyam Sunder Ji Mathur",
    ],
  },
  bride: {
    short: "Guddu",
    formal: "Janhavi",
    role: "The Bride",
    initial: "G",
    portrait: "/art/bride.jpg",
    lineage: [
      "Daughter of Smt. Pinky Ji & Late Shri Ashok Ji Soni",
      "Grand D/o Late Smt. Geeta Devi Ji & Late Shri Om Prakash Ji Soni",
      "Maternal Grand D/o Late Smt. Pushpa Ji & Late Shri Sita Ram Ji Sunalia",
    ],
  },
} as const;

/**
 * The wedding day itself — this drives the countdown. Kept as a string so it
 * is only turned into a Date on the client; a module-level `new Date()` would
 * be frozen at prerender time under Cache Components.
 */
export const WEDDING_ISO = "2026-11-20T00:00:00+05:30";

export const blessings = {
  invocation: "!! Shri Ganeshay Namah !!",
  lead: "With grace of almighty & blessings of",
  elders: [
    "Late Smt. Savita Devi Ji & Late Shri Shanker Lal Ji Mathur",
    "Late Smt. Nirmala Ji Rai & Late Shri Dr. Prakash Ji Rai",
    "Late Shri Kartik Rai",
  ],
  hosts: "Smt. Vandana & Shri Praveen Rai",
  request:
    "request the pleasure of your gracious presence on the auspicious occasion of the Wedding Ceremony of their beloved son",
} as const;

export type EventItem = {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  day: string;
  date: string;
  dateISO: string;
  time: string;
  venue: string;
  address: string[];
  city: string;
  mapQuery: string;
  icon: "rings" | "music";
  /** Calendar block in UTC — the ICS generator reads these directly. */
  calStart: string;
  calEnd: string;
};

export const events: EventItem[] = [
  {
    id: "wedding",
    name: "Wedding Ceremony",
    tagline: "Vivah Sanskar",
    blurb:
      "The pheras, the promises, and the moment two families become one. Your blessings are the only gift we ask for.",
    day: "Friday",
    date: "20 November 2026",
    dateISO: "2026-11-20",
    time: "Evening",
    venue: "Bhakhar Paradise",
    address: ["Narayan Enclave, 200 Ft. Road", "Mangyawas, Mansorvar"],
    city: "Jaipur",
    mapQuery:
      "Bhakhar Paradise, Narayan Enclave, 200 Ft Road, Mangyawas, Mansarovar, Jaipur",
    icon: "rings",
    calStart: "20261120T120000Z",
    calEnd: "20261120T180000Z",
  },
  {
    id: "sangeet",
    name: "Sangeet Sparkles & Aaashirwad Samaroh",
    tagline: "Dance, Music, Masti",
    blurb:
      "An evening full of dhol, dandiya and dancing feet — followed by dinner. Come ready to lose your voice.",
    day: "Sunday",
    date: "22 November 2026",
    dateISO: "2026-11-22",
    time: "7:00 PM onwards, followed by Dinner",
    venue: "Anand Bhawan",
    address: ["Opp. Filter House", "Chopasni Road"],
    city: "Jodhpur",
    mapQuery: "Anand Bhawan, Opp Filter House, Chopasni Road, Jodhpur",
    icon: "music",
    calStart: "20261122T133000Z",
    calEnd: "20261122T183000Z",
  },
];

export const host = {
  label: "From",
  names: "Vandana - Praveen Rai",
  address: [
    "C-102, Mangaldeep Darshan, Main Pal Road",
    "DPS Circle, Jodhpur - 342014 (Raj.)",
  ],
  phones: [
    { display: "94605 51600", tel: "+919460551600" },
    { display: "70148 58832", tel: "+917014858832" },
  ],
} as const;

export const familyTitle = {
  name: "Mathur Family",
  subtitle: "Warmly Welcomes You",
} as const;

export const familyGroups = [
  {
    title: "Maternal",
    align: "left" as const,
    members: [
      "Prem Narayan Ji - Madhu Ji",
      "Suresh Ji - Nirmala Ji",
      "Sanjay Ji - Sheelu Ji",
      "Amit Ji - Shailja Ji",
      "Arpit",
      "Mukund",
      "Amisha",
      "Himanshi",
      "Nilansh",
    ],
  },
  {
    title: "Paternal",
    align: "right" as const,
    members: [
      "Jyoti Prakash",
      "Virendra - Madhu",
      "Ashok - Aradhana",
      "Arun - Sushma",
      "Dr. Anil - Dr. Maneesha",
      "Ankit - Teena",
      "Arpit - Paridhi",
      "Anshul - Alisha",
      "Himanshu - Aishwarya",
      "Priyanshu, Lashika",
    ],
  },
  {
    title: "Sharing the Joy",
    align: "left" as const,
    members: [
      "Darshana - Rakesh Ji",
      "Archna - Ajay Ji",
      "Arpita",
      "Nevadita - Dr. Narsingh Ji",
      "Rakshita - Ravi Ji",
      "Divya, Manan, Rashi, Atharva",
    ],
  },
  {
    title: "Joyously Awaiting",
    align: "right" as const,
    members: ["Ankur", "Aayush - Disha", "Shreyansh", "Rudraksh"],
  },
];

export const familyFooterGroups = [
  {
    title: "Cordial Request",
    members: ["Sona - Manish Ji, Anju - Ajay Ji", "Shruti - Ashwin Ji"],
  },
  {
    title: "Heartiest Welcome",
    members: [
      "Rekha - Basant Ji, Sangeeta - Govind Ji",
      "Smt. Jaya, Rasna - Saurabh Ji",
      "Rimka - Nitesh Ji, Navita - Ajay Ji",
      "Rashmi - Amit Ji, Vinita - Sanjeev Ji",
      "Akanksha - Piyush Ji, Anjali - Himanshu Ji",
    ],
  },
];

/**
 * The couple's own words, from the story artwork they supplied.
 * Swap the images at /public/story for full-resolution versions any time.
 */
export const story = [
  {
    id: "conversations",
    step: "01",
    title: "It Started with Conversations",
    body: "Coffee, endless talks and a million little moments that made everything feel right.",
    image: "/story/1.jpg",
    alt: "Illustration of Avi and Guddu sharing coffee on a yellow sofa",
  },
  {
    id: "comfort",
    step: "02",
    title: "Then Came Comfort",
    body: "The kind of comfort where we could just be ourselves.",
    image: "/story/2.jpg",
    alt: "Illustration of Avi and Guddu curled up together on a rainy afternoon",
  },
  {
    id: "forever",
    step: "03",
    title: "And Now\u2026 Forever",
    body: "Different moments, same team. Here's to a lifetime of more coffee, more adventures and a whole lot more us.",
    image: "/story/3.jpg",
    alt: "Illustration of Avi and Guddu standing back to back, holding hands",
  },
];

export const navSections = [
  { id: "home", label: "Home" },
  { id: "couple", label: "Couple" },
  { id: "story", label: "Our Story" },
  { id: "events", label: "Events" },
  { id: "family", label: "Family" },
  { id: "rsvp", label: "RSVP" },
];

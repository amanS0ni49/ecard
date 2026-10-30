/**
 * Every word on this page comes from the printed Avi–Guddu invitation.
 * Keep this file as the single source of truth so the card and the site never drift.
 */

export const couple = {
  groom: {
    short: "Avi",
    formal: "Bhavesh",
    role: "The Groom",
    photo: "/photos/2.jpg",
    lineage: [
      "Son of Smt. Vandana & Shri Praveen Rai",
      "Maternal Grand S/o Smt. Rajrani Ji & Late Shri Shyam Sunder Ji Mathur",
    ],
  },
  bride: {
    short: "Guddu",
    formal: "Janhavi",
    role: "The Bride",
    photo: "/photos/4.jpg",
    lineage: [
      "Daughter of Smt. Pinky Ji & Late Shri Ashok Ji Soni",
      "Grand D/o Late Smt. Geeta Devi Ji & Late Shri Om Prakash Ji Soni",
      "Maternal Grand D/o Late Smt. Pushpa Ji & Late Shri Sita Ram Ji Sunalia",
    ],
  },
} as const;

/** The wedding day itself — this drives the countdown. */
export const WEDDING_DATE = new Date("2026-11-20T00:00:00+05:30");

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

export const gallery = [
  { src: "/photos/1.jpg", caption: "Two cups, one morning" },
  { src: "/photos/2.jpg", caption: "The look that started it all" },
  { src: "/photos/3.jpg", caption: "Rainy afternoons, no plans" },
  { src: "/photos/4.jpg", caption: "Back to back, hand in hand" },
];

export const navSections = [
  { id: "home", label: "Home" },
  { id: "couple", label: "Couple" },
  { id: "story", label: "Moments" },
  { id: "events", label: "Events" },
  { id: "family", label: "Family" },
  { id: "rsvp", label: "RSVP" },
];

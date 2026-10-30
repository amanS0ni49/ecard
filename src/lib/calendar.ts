import type { EventItem } from "./data";

const escape = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

/** Builds a minimal RFC 5545 file so guests can drop the event into any calendar app. */
export function buildIcs(event: EventItem): string {
  const location = [event.venue, ...event.address, event.city].join(", ");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Avi & Guddu//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.id}-avi-guddu-2026@wedding`,
    `DTSTAMP:${event.calStart}`,
    `DTSTART:${event.calStart}`,
    `DTEND:${event.calEnd}`,
    `SUMMARY:${escape(`${event.name} — Avi & Guddu`)}`,
    `DESCRIPTION:${escape(event.blurb)}`,
    `LOCATION:${escape(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs(event: EventItem) {
  const blob = new Blob([buildIcs(event)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `avi-guddu-${event.id}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

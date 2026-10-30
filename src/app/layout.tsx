import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display, Great_Vibes, Cinzel } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const title = "Avi & Guddu · Wedding Invitation · 20 November 2026";
const description =
  "Smt. Vandana & Shri Praveen Rai request the pleasure of your gracious presence at the wedding of Avi (Bhavesh) with Guddu (Janhavi) — Friday, 20th November 2026, Bhakhar Paradise, Jaipur.";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL on Vercel so share cards resolve absolute image URLs.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Avi & Guddu — Wedding Invitation" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  icons: { icon: "/art/ganesha.png" },
};

export const viewport: Viewport = {
  themeColor: "#d7eaf0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${greatVibes.variable} ${cinzel.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}

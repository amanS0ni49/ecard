"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Blessings from "@/components/Blessings";
import Couple from "@/components/Couple";
import Story from "@/components/Story";
import Events from "@/components/Events";
import Family from "@/components/Family";
import Rsvp from "@/components/Rsvp";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import TopBar from "@/components/TopBar";
import { play as playMusic } from "@/lib/audio";

const SEEN_KEY = "avi-guddu:envelope-opened";

/**
 * Whether this guest already opened the envelope earlier in the session.
 * Read through useSyncExternalStore rather than an effect so the prerendered
 * markup (no envelope) hydrates cleanly before the real value is applied.
 */
const seenStore = {
  subscribe: () => () => {},
  get: () => {
    try {
      return sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      return false; // private mode — just show the envelope
    }
  },
  getServer: () => true,
};

export default function Page() {
  const seenAtMount = useSyncExternalStore(
    seenStore.subscribe,
    seenStore.get,
    seenStore.getServer,
  );
  const [dismissed, setDismissed] = useState(false);
  const showEnvelope = !seenAtMount && !dismissed;

  useEffect(() => {
    // A reload should land on the hero, not wherever the guest left off.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  const opened = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    setDismissed(true);
  };

  // Opening the envelope is a real user gesture, which is what lets the music
  // start; browsers would block it otherwise. Guests who skip the envelope
  // (second visit in a session) use the toggle in the corner instead.
  const openEnvelope = () => {
    void playMusic();
  };

  const started = !showEnvelope;

  return (
    <>
      <AnimatePresence>
        {showEnvelope && (
          <Preloader key="envelope" onOpen={openEnvelope} onDone={opened} />
        )}
      </AnimatePresence>

      <TopBar visible={started} />
      <Nav visible={started} />

      <main>
        <Hero started={started} />
        <Blessings />
        <Couple />
        <Story />
        <Events />
        <Family />
        <Rsvp />
      </main>

      <Footer />
    </>
  );
}

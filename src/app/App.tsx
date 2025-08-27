import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from "react";

export default function App() {
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "g") {
        setGlow((g) => !g);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className={`${glow ? "glow-mode" : ""} min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors`}>
      {/* Floating toggle (accessible alternative to Shift+G) */}
      <button
        onClick={() => setGlow((g) => !g)}
        title="Toggle Glow (Shift+G)"
        aria-label="Toggle Glow background"
        className="fixed right-3 bottom-3 z-50 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur px-3 py-1 text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        {glow ? "Glow: on" : "Glow: off"}
      </button>

      {/* Layout */}
      <header className="sticky top-0 z-40">
        <Navbar />
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
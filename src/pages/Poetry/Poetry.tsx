import { useEffect, useMemo, useState } from "react";
import { poems, poemTags, type Poem } from "@/data/poems";
import PoemModal from "@/components/PoemModal";
import { motion, AnimatePresence } from "framer-motion";
import Starfield from "@/components/Starfield";

export default function Poetry() {
    const [activeTag, setActiveTag] = useState<string>("ALL");
    const [openSlug, setOpenSlug] = useState<string | null>(null);
    const [query, setQuery] = useState<string>("");

    // Match the "pop" pattern: tint stars while on page
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: "rose" } }));
        return () => {
            window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: "neutral" } }));
        };
    }, []);

    const filtered: Poem[] = useMemo(() => {
        const base =
            activeTag === "ALL" ? poems : poems.filter((p: Poem) => p.tags?.includes(activeTag));
        if (!query.trim()) return base;
        const q = query.toLowerCase();
        return base.filter(
            (p: Poem) => p.title?.toLowerCase().includes(q) || p.content?.toLowerCase().includes(q)
        );
    }, [activeTag, query]);

    function handleDownloadView() {
        const lines: string[] = [];
        filtered.forEach((p) => {
            lines.push(p.title || "Untitled");
            if (p.date) lines.push(p.date);
            if (p.tags?.length) lines.push(`[${p.tags.join(", ")}]`);
            lines.push("");
            lines.push(p.content || "");
            lines.push("\n---\n");
        });
        const blob = new Blob([lines.join("\n")], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "poems_selection.txt";
        a.click();
        URL.revokeObjectURL(url);
    }

    function openRandom() {
        const list = filtered.length ? filtered : poems;
        const pick = list[Math.floor(Math.random() * list.length)];
        setOpenSlug(pick.slug);
    }

    const current: Poem | null = useMemo(
        () => poems.find((p: Poem) => p.slug === openSlug) ?? null,
        [openSlug]
    );

    // quick reading-time estimator (200 wpm)
    function mins(p: Poem): number {
        const words = (p.content || "").trim().split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.round(words / 200));
    }

    return (
        <section className="space-y-6">
            {/* Starfield header (same treatment as Home/Projects) */}
            <header className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <Starfield
                    density={0.45}
                    speed={0.6}
                    className="opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
                />
                <div className="relative z-10 space-y-2">
                    <h1 className="text-3xl font-semibold">Poetry</h1>
                    <p className="opacity-80">
                        A curated selection (formatting preserved). Filter by theme to browse.
                    </p>
                    <div className="text-sm opacity-70">
                        Showing {filtered.length} of {poems.length}
                    </div>
                </div>
            </header>

            {/* Controls: search + download + random + tags */}
            <div className="flex flex-col gap-3">
                {/* Row 1: search + actions */}
                <div className="flex flex-wrap items-center gap-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search poems by title or text…"
                        className="w-full sm:flex-1 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                        aria-label="Search poems"
                    />
                    <button
                        onClick={handleDownloadView}
                        className="shrink-0 rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        title="Download current selection as .txt"
                    >
                        Download view
                    </button>
                    <button
                        onClick={openRandom}
                        className="shrink-0 rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        title="Open a random poem from the current selection"
                    >
                        Random poem
                    </button>
                </div>

                {/* Row 2: tag filter bar */}
                <div className="flex flex-wrap gap-2">
                    <button
                        className={`px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 ${activeTag === "ALL" ? "bg-neutral-200 dark:bg-neutral-800" : ""
                            }`}
                        onClick={() => setActiveTag("ALL")}
                    >
                        All
                    </button>
                    {poemTags.map((t) => (
                        <button
                            key={t}
                            className={`px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 ${activeTag === t ? "bg-neutral-200 dark:bg-neutral-800" : ""
                                }`}
                            onClick={() => setActiveTag(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid of titles (animated) */}
            <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                <AnimatePresence>
                    {filtered.map((p: Poem) => (
                        <motion.li
                            key={p.slug}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <button
                                className="w-full text-left rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                                onClick={() => setOpenSlug(p.slug)}
                            >
                                <div className="font-semibold">{p.title}</div>
                                <div className="text-sm opacity-70">
                                    {p.date}
                                    {p.content ? (
                                        <span className="ml-1.5">
                                            • ~{mins(p)} min read
                                        </span>
                                    ) : null}
                                </div>
                                {p.tags?.length ? (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {p.tags.map((t: string) => (
                                            <span
                                                key={t}
                                                className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                ) : null}
                            </button>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>

            {/* Modal */}
            <PoemModal
                open={!!current}
                onClose={() => setOpenSlug(null)}
                title={current?.title ?? ""}
                date={current?.date}
                content={current?.content ?? ""}
            />
        </section>
    );
}

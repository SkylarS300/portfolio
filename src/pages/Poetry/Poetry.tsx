import { useMemo, useState } from "react";
import { poems, poemTags } from "@/data/poems";
import PoemModal from "@/components/PoemModal";

export default function Poetry() {
    const [activeTag, setActiveTag] = useState<string>("ALL");
    const [openSlug, setOpenSlug] = useState<string | null>(null);

    const filtered = useMemo(() => {
        if (activeTag === "ALL") return poems;
        return poems.filter((p) => p.tags?.includes(activeTag));
    }, [activeTag]);

    const current = useMemo(
        () => poems.find((p) => p.slug === openSlug) ?? null,
        [openSlug]
    );

    return (
        <section className="space-y-6">
            <header className="space-y-2">
                <h1 className="text-3xl font-semibold">Poetry</h1>
                <p className="opacity-80">
                    A curated selection (formatting preserved). Filter by theme to browse.
                </p>
            </header>

            {/* Tag filter bar */}
            <div className="flex flex-wrap gap-2">
                <button
                    className={`px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 ${activeTag === "ALL" ? "bg-neutral-200 dark:bg-neutral-800" : ""}`}
                    onClick={() => setActiveTag("ALL")}
                >
                    All
                </button>
                {poemTags.map((t) => (
                    <button
                        key={t}
                        className={`px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 ${activeTag === t ? "bg-neutral-200 dark:bg-neutral-800" : ""}`}
                        onClick={() => setActiveTag(t)}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Grid of titles */}
            <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {filtered.map((p) => (
                    <li key={p.slug}>
                        <button
                            className="w-full text-left rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                            onClick={() => setOpenSlug(p.slug)}
                        >
                            <div className="font-semibold">{p.title}</div>
                            <div className="text-sm opacity-70">{p.date}</div>
                            {p.tags?.length ? (
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {p.tags.map((t) => (
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
                    </li>
                ))}
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

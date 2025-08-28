import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects, type Project } from "@/data/projects";
import { formatDate } from "@/lib/utils";
import Starfield from "@/components/Starfield";

export default function Projects() {
    const [activeTag, setActiveTag] = useState<string>("ALL");

    // Match Home hero: 'sky' tint, reset to neutral on unmount
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: "sky" } }));
        return () => {
            window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: "neutral" } }));
        };
    }, []);

    // Unique tags for filter chips
    const tags: string[] = useMemo(
        () => Array.from(new Set(projects.flatMap((p) => p.tags || []))).sort((a, b) => a.localeCompare(b)),
        []
    );

    // Filter + sort (featured first)
    const filtered: Project[] = useMemo(() => {
        const base = activeTag === "ALL" ? projects : projects.filter((p) => (p.tags || []).includes(activeTag));
        return [...base].sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
        });
    }, [activeTag]);

    return (
        <section className="space-y-6">
            {/* Header block with the SAME star look as Home */}
            <header className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <Starfield
                    density={0.45}
                    speed={0.6}
                    className="opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
                />
                <div className="relative z-10">
                    <h1 className="text-3xl font-semibold">Projects</h1>
                    <p className="opacity-80 mt-1">A selection of tools and research I built.</p>

                    {/* Filter chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        <button
                            className={`px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 ${activeTag === "ALL" ? "bg-neutral-200 dark:bg-neutral-800" : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
                                }`}
                            onClick={() => setActiveTag("ALL")}
                        >
                            All
                        </button>
                        {tags.map((t) => (
                            <button
                                key={t}
                                className={`px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 ${activeTag === t ? "bg-neutral-200 dark:bg-neutral-800" : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
                                    }`}
                                onClick={() => setActiveTag(t)}
                                aria-pressed={activeTag === t}
                                title={`Filter by ${t}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="mt-2 text-sm opacity-70">Showing {filtered.length} of {projects.length}</div>
                </div>
            </header>

            {/* Grid */}
            <ul className="grid gap-5 sm:grid-cols-2">
                {filtered.map((p: Project) => (
                    <li
                        key={p.slug}
                        className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:ring-1 hover:ring-sky-400/30 transition"
                    >
                        <Link to={`/projects/${p.slug}`} className="block">
                            <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                                {p.image ? (
                                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="text-sm opacity-70">[placeholder screenshot]</div>
                                )}

                                {p.lastUpdated ? (
                                    <span
                                        className="absolute left-2 top-2 rounded-full bg-white/85 dark:bg-neutral-900/85 backdrop-blur px-2 py-0.5 text-[10px] font-medium border border-neutral-200 dark:border-neutral-800"
                                        title={`Last updated ${formatDate(p.lastUpdated)}`}
                                    >
                                        Updated {formatDate(p.lastUpdated)}
                                    </span>
                                ) : null}

                                {p.featured ? (
                                    <span
                                        className="absolute right-2 top-2 rounded-full bg-white/85 dark:bg-neutral-900/85 backdrop-blur px-2 py-0.5 text-[10px] font-semibold border border-neutral-200 dark:border-neutral-800"
                                        title="Featured project"
                                    >
                                        ★ Featured
                                    </span>
                                ) : null}
                            </div>

                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{p.title}</h2>
                                <p className="opacity-80 mt-1">{p.summary}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {(p.tags || []).map((t: string) => (
                                        <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

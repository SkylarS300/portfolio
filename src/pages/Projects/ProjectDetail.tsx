import { useParams, Link } from "react-router-dom";
import { useMemo, useState, useEffect, useCallback } from "react";
import { projects, type Project } from "@/data/projects";
import { formatDate } from "@/lib/utils";
import Starfield from "@/components/Starfield";

export default function ProjectDetail() {
    const { slug } = useParams();
    const p: Project | undefined = projects.find((x: Project) => x.slug === slug);

    // Match Home star tint: 'sky'
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: "sky" } }));
        return () => {
            window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: "neutral" } }));
        };
    }, []);

    // Prev/Next based on data order
    const { prev, next } = useMemo(() => {
        const idx = projects.findIndex((x) => x.slug === slug);
        return {
            prev: idx > 0 ? projects[idx - 1] : undefined,
            next: idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : undefined,
        };
    }, [slug]);

    // Optional image zoom modal
    const [imgOpen, setImgOpen] = useState(false);
    const onKey = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") setImgOpen(false);
    }, []);
    useEffect(() => {
        if (!imgOpen) return;
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [imgOpen, onKey]);

    if (!p) {
        return (
            <section className="space-y-4">
                <h1 className="text-2xl font-semibold">Project not found</h1>
                <Link to="/projects" className="underline">Back to projects</Link>
            </section>
        );
    }

    const results = p.results;
    const impact = p.impact;

    return (
        <article className="space-y-6">
            {/* Title + meta with the SAME star look as Home */}
            <header className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <Starfield
                    density={0.45}
                    speed={0.6}
                    className="opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
                />
                <div className="relative z-10 space-y-3">
                    <h1 className="text-3xl font-semibold">{p.title}</h1>

                    {/* Top meta line */}
                    <div className="text-sm opacity-80 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span>{p.year}</span>
                        <span>•</span>
                        <span>{p.role}</span>
                        {p.lastUpdated ? (
                            <>
                                <span>•</span>
                                <span title={`Last updated ${formatDate(p.lastUpdated)}`}>
                                    Updated {formatDate(p.lastUpdated)}
                                </span>
                            </>
                        ) : null}
                        {p.featured ? (
                            <>
                                <span>•</span>
                                <span className="rounded-full border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 text-[10px] font-semibold">
                                    ★ Featured
                                </span>
                            </>
                        ) : null}
                    </div>

                    {/* Tags row */}
                    {p.tags?.length ? (
                        <div className="flex flex-wrap gap-2">
                            {p.tags.map((t) => (
                                <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700">
                                    {t}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </div>
            </header>

            {/* Hero image */}
            <div
                className="aspect-video bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center rounded-xl overflow-hidden cursor-zoom-in"
                onClick={() => p.image && setImgOpen(true)}
                role={p.image ? "button" : undefined}
                title={p.image ? "Click to zoom" : undefined}
            >
                {p.image ? (
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                ) : (
                    <div className="opacity-70">[placeholder screenshot]</div>
                )}
            </div>

            {/* Optional zoom modal */}
            {imgOpen && p.image ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70" onClick={() => setImgOpen(false)} />
                    <div className="relative z-10 max-w-5xl w-full">
                        <button
                            onClick={() => setImgOpen(false)}
                            className="absolute right-2 top-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur px-2 py-1 text-xs hover:bg-white dark:hover:bg-neutral-900"
                        >
                            Close
                        </button>
                        <img src={p.image} alt={p.title} className="w-full h-auto rounded-xl" />
                    </div>
                </div>
            ) : null}

            {/* Summary */}
            <p className="opacity-90">{p.summary}</p>

            {/* Optional callouts */}
            {results?.length || impact?.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {results?.length ? (
                        <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
                            <h3 className="text-lg font-semibold">Results</h3>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                {results.map((r, i) => (
                                    <li key={i}>{r}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null}
                    {impact?.length ? (
                        <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
                            <h3 className="text-lg font-semibold">Impact</h3>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                {impact.map((r, i) => (
                                    <li key={i}>{r}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null}
                </div>
            ) : null}

            {/* Links */}
            {p.links?.length ? (
                <section className="space-y-2">
                    <h2 className="text-lg font-semibold">Links</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        {p.links.map((l) => (
                            <li key={l.href}>
                                <a className="underline" href={l.href} target="_blank" rel="noreferrer">
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}

            {/* Prev / Next */}
            <nav className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <div>
                    {prev ? (
                        <Link to={`/projects/${prev.slug}`} className="underline">
                            ← {prev.title}
                        </Link>
                    ) : (
                        <span className="opacity-40">Start</span>
                    )}
                </div>
                <div>
                    {next ? (
                        <Link to={`/projects/${next.slug}`} className="underline">
                            {next.title} →
                        </Link>
                    ) : (
                        <span className="opacity-40">End</span>
                    )}
                </div>
            </nav>

            {/* Back link */}
            <Link to="/projects" className="inline-block underline">← Back</Link>
        </article>
    );
}

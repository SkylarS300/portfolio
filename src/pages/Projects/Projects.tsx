import { Link } from "react-router-dom";
import { projects, type Project } from "@/data/projects";
import { formatDate } from "@/lib/utils";

export default function Projects() {
    const ordered: Project[] = [...projects].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    });

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-3xl font-semibold">Projects</h1>
                <p className="opacity-80">A selection of tools and research I built.</p>
            </header>

            <ul className="grid gap-5 sm:grid-cols-2">
                {ordered.map((p: Project) => (
                    <li key={p.slug} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
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
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{p.title}</h2>
                                <p className="opacity-80 mt-1">{p.summary}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {p.tags.map((t: string) => (
                                        <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700">{t}</span>
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

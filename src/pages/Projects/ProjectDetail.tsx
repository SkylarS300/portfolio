import { useParams, Link } from "react-router-dom";
import { projects, type Project } from "@/data/projects";

export default function ProjectDetail() {
    const { slug } = useParams();
    const p: Project | undefined = projects.find((x: Project) => x.slug === slug);

    if (!p) {
        return (
            <section className="space-y-4">
                <h1 className="text-2xl font-semibold">Project not found</h1>
                <Link to="/projects" className="underline">Back to projects</Link>
            </section>
        );
    }

    return (
        <article className="space-y-6">
            <header className="space-y-2">
                <h1 className="text-3xl font-semibold">{p.title}</h1>
                <div className="text-sm opacity-70">{p.year} • {p.role}</div>
                {p.lastUpdated ? (
                    <div className="text-xs opacity-70">Last updated {p.lastUpdated}</div>
                ) : null}
            </header>

            <div className="aspect-video bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center rounded-xl overflow-hidden">
                {p.image ? (
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                ) : (
                    <div className="opacity-70">[placeholder screenshot]</div>
                )}
            </div>

            <p className="opacity-90">{p.summary}</p>

            <section className="space-y-2">
                <h2 className="text-lg font-semibold">Links</h2>
                <ul className="list-disc pl-5 space-y-1">
                    {(p.links ?? []).map((l: { label: string; href: string }) => (
                        <li key={l.href}>
                            <a className="underline" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                        </li>
                    ))}
                </ul>
            </section>

            <Link to="/projects" className="inline-block underline">← Back</Link>
        </article>
    );
}

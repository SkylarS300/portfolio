import { useEffect } from "react";
import { Link } from "react-router-dom";
import { projects, type Project } from "@/data/projects";
import { poems, type Poem } from "@/data/poems";
import Starfield from "@/components/Starfield";

export default function Home() {
    const featuredProject: Project | undefined =
        projects.find((p: Project) => !!p.featured) ?? projects[0];

    const featuredPoem: Poem | undefined = poems[0];
    const projectCount = projects.length;
    const poemCount = poems.length;

    // Tint the starfield while this page is mounted
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: "sky" } }));
        return () => {
            window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: "neutral" } }));
        };
    }, []);

    return (
        <section className="space-y-10">
            {/* Hero with starfield */}
            <header className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                {/* subtle starfield layer */}
                <Starfield
                    density={0.45}
                    speed={0.6}
                    className="opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
                />
                <div className="relative z-10 space-y-4">
                    <h1 className="text-3xl md:text-4xl font-semibold">
                        I write code and poems to make sense of complicated worlds.
                    </h1>
                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        >
                            Explore Projects →
                        </Link>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        >
                            Resume (PDF)
                        </a>
                    </div>
                </div>
            </header>

            {/* Featured tiles */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition">
                    <div className="text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                        Featured Project
                    </div>
                    <h2 className="text-xl font-semibold mt-1">
                        {featuredProject?.title}
                    </h2>
                    <p className="mt-2">{featuredProject?.summary}</p>

                    {/* Accent divider */}
                    <div className="h-px my-4 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

                    {featuredProject && (
                        <Link to={`/projects/${featuredProject.slug}`} className="underline">
                            Explore project →
                        </Link>
                    )}
                </div>

                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition">
                    <div className="text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                        Featured Poem
                    </div>
                    <h2 className="text-xl font-semibold mt-1">{featuredPoem?.title}</h2>
                    <p className="italic opacity-90 mt-2">
                        {(featuredPoem?.content ?? "").split("\n").slice(0, 3).join(" ")}…
                    </p>

                    {/* Accent divider */}
                    <div className="h-px my-4 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

                    <Link to="/poetry" className="underline">
                        Read poetry →
                    </Link>
                </div>
            </div>

            {/* Quick stats */}
            <div className="grid gap-6 sm:grid-cols-3 text-center">
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition">
                    <div className="text-3xl font-bold">{projectCount}</div>
                    <div className="opacity-80">Projects built</div>
                </div>
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition">
                    <div className="text-3xl font-bold">{poemCount}</div>
                    <div className="opacity-80">Poems published</div>
                </div>
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition">
                    <div className="text-3xl font-bold">∞</div>
                    <div className="opacity-80">Ideas in progress</div>
                </div>
            </div>
        </section>
    );
}

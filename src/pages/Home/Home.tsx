import { Link } from "react-router-dom";
import { projects, type Project } from "@/data/projects";
import { poems, type Poem } from "@/data/poems";

export default function Home() {
    const featuredProject: Project | undefined =
        projects.find((p: Project) => !!p.featured) ?? projects[0];

    const featuredPoem: Poem | undefined = poems[0];
    const projectCount = projects.length;
    const poemCount = poems.length;

    return (
        <section className="space-y-10">
            <h1 className="text-3xl md:text-4xl font-semibold">
                I write code and poems to make sense of complicated worlds.
            </h1>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                    <h2 className="text-xl font-semibold mb-2">
                        Featured Project — {featuredProject?.title}
                    </h2>
                    <p className="mb-4">{featuredProject?.summary}</p>
                    {featuredProject && (
                        <Link to={`/projects/${featuredProject.slug}`} className="underline">
                            Explore project →
                        </Link>
                    )}
                </div>

                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                    <h2 className="text-xl font-semibold mb-2">Featured Poem — {featuredPoem?.title}</h2>
                    <p className="italic opacity-90">
                        {(featuredPoem?.content ?? "").split("\n").slice(0, 3).join(" ")}…
                    </p>
                    <Link to="/poetry" className="underline">Read poetry →</Link>
                </div>
            </div>


            {/* Quick stats (subtle flex) */}
            <div className="grid gap-6 sm:grid-cols-3 text-center">
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                    <div className="text-3xl font-bold">{projectCount}</div>
                    <div className="opacity-80">Projects built</div>
                </div>
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                    <div className="text-3xl font-bold">{poemCount}</div>
                    <div className="opacity-80">Poems published</div>
                </div>
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                    <div className="text-3xl font-bold">∞</div>
                    <div className="opacity-80">Ideas in progress</div>
                </div>
            </div>
        </section>
    );
}

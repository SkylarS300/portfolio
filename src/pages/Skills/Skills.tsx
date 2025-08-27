import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

/** ---- Data --------------------------------------------------------------- */

type CategoryKey = "All" | "Technical" | "Leadership" | "Communication" | "Advocacy";

type Skill = {
    label: string;
    category: Exclude<CategoryKey, "All">;
    // optional short note shown on hover via the title attribute
    note?: string;
};

const CATEGORY_COLORS: Record<Exclude<CategoryKey, "All">, string> = {
    Technical: "bg-sky-100 text-sky-900 border-sky-200 dark:bg-sky-900/40 dark:text-sky-100 dark:border-sky-800",
    Leadership: "bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-100 dark:border-emerald-800",
    Communication: "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200 dark:bg-fuchsia-900/40 dark:text-fuchsia-100 dark:border-fuchsia-800",
    Advocacy: "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-900/40 dark:text-amber-100 dark:border-amber-800",
};

const SKILLS: Skill[] = [
    // Technical – programming, data science, bioinformatics, tooling
    { label: "Python", category: "Technical", note: "Data science + scripting" },
    { label: "Pandas", category: "Technical" },
    { label: "SciPy", category: "Technical" },
    { label: "scikit-learn", category: "Technical" },
    { label: "Seaborn", category: "Technical" },
    { label: "Matplotlib", category: "Technical" },
    { label: "Plotly", category: "Technical" },
    { label: "JavaScript", category: "Technical" },
    { label: "HTML/CSS", category: "Technical" },
    { label: "SQL", category: "Technical" },
    { label: "React", category: "Technical" },
    { label: "FastAPI", category: "Technical" },
    { label: "Tailwind", category: "Technical" },
    { label: "Git/GitHub", category: "Technical" },
    { label: "RNA-seq analysis", category: "Technical" },
    { label: "PCA", category: "Technical" },
    { label: "DE analysis", category: "Technical", note: "Differential Expression" },
    { label: "Enrichment (g:Profiler)", category: "Technical" },
    { label: "Recharts", category: "Technical" },
    { label: "ArcGIS", category: "Technical" },
    { label: "Looker Studio", category: "Technical" },
    { label: "Vercel", category: "Technical", note: "Deployment" },
    { label: "Render", category: "Technical", note: "Deployment" },
    { label: "Jupyter/Colab", category: "Technical" },

    // Leadership
    { label: "STEM org president", category: "Leadership", note: "Led multiple organizations" },
    { label: "Team coordination", category: "Leadership" },
    { label: "Peer mentoring", category: "Leadership", note: "Programming & biology" },

    // Communication
    { label: "Award-winning writer", category: "Communication" },
    { label: "Presentations (PwC)", category: "Communication" },
    { label: "Presentations (Rep. Bowman team)", category: "Communication" },
    { label: "Presentations (Apple Fifth Ave.)", category: "Communication" },
    { label: "Technical writing", category: "Communication" },
    { label: "UX-focused docs", category: "Communication" },

    // Advocacy
    { label: "LearnLoom (education)", category: "Advocacy" },
    { label: "Civic tech (Miranda)", category: "Advocacy" },
    { label: "Public ed (OurChoice)", category: "Advocacy" },
];

/** ---- Component --------------------------------------------------------- */

export default function Skills() {
    const [active, setActive] = useState<CategoryKey>("All");
    const [q, setQ] = useState("");

    // Tiny “heatmap” counts by category
    const counts = useMemo(() => {
        const base = { Technical: 0, Leadership: 0, Communication: 0, Advocacy: 0 } as Record<
            Exclude<CategoryKey, "All">,
            number
        >;
        for (const s of SKILLS) base[s.category] += 1;
        return base;
    }, []);

    // Filter + search
    const filtered = useMemo(() => {
        const base = active === "All" ? SKILLS : SKILLS.filter((s) => s.category === active);
        if (!q.trim()) return base;
        const needle = q.toLowerCase();
        return base.filter((s) => s.label.toLowerCase().includes(needle));
    }, [active, q]);

    // Optional: nudge the starfield color theme if your App listens for it.
    useEffect(() => {
        // Emits a hint; harmless if nothing handles it.
        const colorHint =
            active === "Technical"
                ? "sky"
                : active === "Leadership"
                    ? "emerald"
                    : active === "Communication"
                        ? "fuchsia"
                        : active === "Advocacy"
                            ? "amber"
                            : "neutral";
        window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: colorHint } }));
    }, [active]);

    return (
        <section className="space-y-8">
            <header className="space-y-2">
                <h1 className="text-3xl font-semibold">Skills</h1>
                <p className="opacity-80">
                    A visual, filterable overview of my technical, leadership, communication, and advocacy skills.
                </p>
            </header>

            {/* Category heatmap */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
                <div className="grid gap-3 sm:grid-cols-4">
                    {(
                        [
                            ["Technical", counts.Technical, "bg-sky-200 dark:bg-sky-900/60"] as const,
                            ["Leadership", counts.Leadership, "bg-emerald-200 dark:bg-emerald-900/60"] as const,
                            ["Communication", counts.Communication, "bg-fuchsia-200 dark:bg-fuchsia-900/60"] as const,
                            ["Advocacy", counts.Advocacy, "bg-amber-200 dark:bg-amber-900/60"] as const,
                        ] as const
                    ).map(([name, count, barCls]) => (
                        <div key={name} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span>{name}</span>
                                <span className="opacity-70">{count}</span>
                            </div>
                            <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                                <div
                                    className={`h-full ${barCls}`}
                                    style={{ width: `${Math.max(12, (count / SKILLS.length) * 100)}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls: filters + search */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                    {(["All", "Technical", "Leadership", "Communication", "Advocacy"] as CategoryKey[]).map((c) => (
                        <button
                            key={c}
                            onClick={() => setActive(c)}
                            className={`px-3 py-1.5 rounded-full border text-sm transition
                ${c === "All"
                                    ? "border-neutral-300 dark:border-neutral-700"
                                    : `border-transparent ${CATEGORY_COLORS[c as Exclude<CategoryKey, "All">]}`}
                ${active === c ? "ring-2 ring-black/10 dark:ring-white/10" : ""}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search skills…"
                        className="w-64 max-w-[70vw] rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                        aria-label="Search skills"
                    />
                    {q && (
                        <button
                            onClick={() => setQ("")}
                            className="text-sm underline opacity-80 hover:opacity-100"
                            aria-label="Clear search"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Chips grid */}
            <LayoutGroup>
                <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                    <AnimatePresence>
                        {filtered.map((s) => {
                            const cls = CATEGORY_COLORS[s.category];
                            return (
                                <motion.li
                                    key={`${s.category}:${s.label}`}
                                    layout
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.18 }}
                                >
                                    <div
                                        title={s.note || s.label}
                                        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${cls} hover:scale-[1.02] transition-transform`}
                                    >
                                        <span className="inline-block h-2 w-2 rounded-full bg-current opacity-60" />
                                        <span>{s.label}</span>
                                        <span className="ml-auto text-[10px] opacity-70">{s.category}</span>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </AnimatePresence>
                </ul>
            </LayoutGroup>

            {/* Footer note */}
            <p className="text-sm opacity-70">
                Tip: filter by category, then use the search to narrow down specific libraries, tools, or topics.
            </p>
        </section>
    );
}

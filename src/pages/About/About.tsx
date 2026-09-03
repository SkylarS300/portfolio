import { useEffect, useMemo, useState } from "react";
import Starfield from "@/components/Starfield";
import { motion } from "framer-motion";

/** Facets (constellation points) mapped to starfield tints */
type FacetId = "builder" | "researcher" | "writer" | "mentor";

const FACETS: {
    id: FacetId;
    title: string;
    blurb: string;
    hue: "sky" | "emerald" | "rose" | "violet";
    tagline: string;
    chips: string[];
}[] = [
        {
            id: "builder",
            title: "Builder — LearnLoom",
            blurb:
                "I founded LearnLoom after discovering a 42% literacy rate at my school. Privacy-first reading tools and grammar quizzes, built with educators and aimed at NYC classrooms.",
            hue: "sky",
            tagline: "Ship small, reliable, privacy-first tools.",
            chips: ["LearnLoom", "Next.js/MySQL", "Built w/ teachers"],
        },
        {
            id: "researcher",
            title: "Researcher — Comp Bio / Genomics",
            blurb:
                "CMU Pre-College Computational Biology sparked deeper work in bioinformatics: RNA-seq pipelines, PCA/DE/enrichment, and biomarkers in cancer, circadian dysregulation, and fetal–tumor parallels.",
            hue: "emerald",
            tagline: "RNA-seq → PCA/DE/Enrichment; figures that speak.",
            chips: ["CMU PCCB", "Biomarkers", "Thousands of samples"],
        },
        {
            id: "writer",
            title: "Writer — Scholastic Awards",
            blurb:
                "Writing—poetry and prose—teaches me to explain complex ideas in tech and biology with clarity and care.",
            hue: "rose",
            tagline: "Clarity & care; language as a lab.",
            chips: ["Scholastic awards", "Readings", "Editing"],
        },
        {
            id: "mentor",
            title: "Mentor & Leader",
            blurb:
                "Student Council VP; President of Peer Tutoring & Coding Clubs; NHS. Mentored with theCoderSchool; civic engagement with Voters of Tomorrow; public-facing data work with OurChoice × Bloomberg Technology.",
            hue: "violet",
            tagline: "Lead with docs, rituals, and good taste.",
            chips: ["SC VP", "Peer Tutoring + Coding", "NHS"],
        },
    ];


/** Curved timeline milestones (showcase projects & roles) */
const TIMELINE = [
    { year: "2025", title: "Bioinformatics Portfolio", txt: "Independent analyses across thousands of RNA-seq samples: breast cancer biomarkers, circadian dysregulation in pancreatic tumors, fetal–tumor growth similarities." },
    { year: "2025", title: "CMU PCCB — Comp Biology", txt: "Carnegie Mellon Pre-College Computational Biology program: genomics, pipelines, and scientific computing that shaped my analysis toolkit." },
    { year: "2024–2025", title: "LearnLoom", txt: "Privacy-first reading + grammar companion, designed with teachers to improve literacy outcomes for underserved students." },
    { year: "2024", title: "OurChoice × Bloomberg Tech", txt: "100+ access visualizations with ArcGIS/JS; community storytelling with real policy implications." },
    { year: "2024", title: "Miranda — Rights Assistant", txt: "Friendly UI over structured legal data to help peers find plain-language rights info fast." },
    { year: "Ongoing", title: "Leadership & Mentorship", txt: "Student Council VP; President — Peer Tutoring & Coding Clubs; NHS; mentor at theCoderSchool; Voters of Tomorrow." },
];

/** Values (flip-cards) */
const VALUES = [
    { front: "Privacy", back: "Track learning without tracking people. Consent and clear controls by default." },
    { front: "Clarity", back: "Short sentences. Good names. Figures that speak. Explain as if readers matter, because they do." },
    { front: "Curiosity", back: "Follow the question. Learn the biology behind the signal." },
    { front: "Service", back: "Making tools that help classrooms and communities now, not someday." },
];

export default function About() {
    const [active, setActive] = useState<FacetId>("builder");

    // Tint starfield to match the active facet
    useEffect(() => {
        const hue = FACETS.find(f => f.id === active)?.hue ?? "violet";
        window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: hue } }));
        return () => { window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: "neutral" } })); };
    }, [active]);

    // Keyboard: ← / → to move across constellation
    useEffect(() => {
        const order: FacetId[] = FACETS.map(f => f.id);
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            e.preventDefault();
            const i = order.indexOf(active);
            const next =
                e.key === "ArrowRight"
                    ? order[(i + 1) % order.length]
                    : order[(i - 1 + order.length) % order.length];
            setActive(next);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active]);


    // word-by-word intro
    const intro = useMemo(
        () => ["I", "build", "tools,", "analyze", "biology,", "and", "write", "clear", "stories."],
        []
    );

    return (
        <section className="space-y-10">
            {/* ── Constellation hero ───────────────────────────────────────────── */}
            <header className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <Starfield density={0.6} speed={0.7} className="opacity-80 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-semibold">
                        {intro.map((w, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.045, duration: 0.22 }}
                                className={i ? "ml-1" : ""}
                            >
                                {w}
                            </motion.span>
                        ))}
                    </h1>

                    {/* signature underline (SVG path draw) */}
                    <svg viewBox="0 0 600 60" className="mt-2 h-10 w-full" aria-hidden="true">
                        {/* base stroke */}
                        <motion.path
                            d="M5,40 C120,10 220,70 340,30 S560,30 595,40"
                            fill="none"
                            stroke="currentColor"
                            strokeOpacity={0.3}
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.15, ease: "easeInOut", delay: 0.15 }}
                        />
                        {/* shimmering overlay */}
                        <motion.path
                            d="M5,40 C120,10 220,70 340,30 S560,30 595,40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeOpacity={0.6}
                            strokeDasharray="18 220"
                            animate={{ strokeDashoffset: [240, 0] }}
                            transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
                        />
                    </svg>


                    {/* constellation selector */}
                    <Constellation active={active} onPick={setActive} />
                    <FacetPanel id={active} />
                </div>
            </header>

            {/* ── Curved timeline (pulsing nodes) ──────────────────────────────── */}
            <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <h2 className="text-xl font-semibold mb-4">Path so far</h2>
                <Timeline />
            </section>

            {/* ── Values (3D flip cards) ───────────────────────────────────────── */}
            <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <h2 className="text-xl font-semibold mb-4">What guides my work</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {VALUES.map((v, i) => (
                        <FlipCard key={i} front={v.front} back={v.back} />
                    ))}
                </div>
            </section>

            {/* ── Marquee (roles & recognitions) ───────────────────────────────── */}
            <Marquee
                items={[
                    "CMU Pre-College Computational Biology",
                    "Scholastic Writing Awards",
                    "Student Council Vice President",
                    "President — Peer Tutoring Club",
                    "President — Coding Club",
                    "National Honor Society",
                    "Mentor — theCoderSchool",
                    "Voters of Tomorrow",
                    "OurChoice × Bloomberg Technology",
                ]}
            />
        </section>
    );
}

/* ===== Constellation (interactive SVG) ===== */
function Constellation({
    active,
    onPick,
}: {
    active: FacetId;
    onPick: (id: FacetId) => void;
}) {
    const nodes: { id: FacetId; x: number; y: number }[] = [
        { id: "builder", x: 80, y: 60 },
        { id: "researcher", x: 240, y: 35 },
        { id: "writer", x: 420, y: 70 },
        { id: "mentor", x: 540, y: 30 },
    ];
    const lines: [FacetId, FacetId][] = [
        ["builder", "researcher"],
        ["researcher", "writer"],
        ["writer", "mentor"],
    ];

    const hueColor: Record<string, string> = {
        sky: "#38bdf8",
        emerald: "#34d399",
        rose: "#f43f5e",
        violet: "#8b5cf6",
    };
    const facet = FACETS.find(f => f.id === active)!;
    const tint = hueColor[facet.hue];

    return (
        <div className="relative mt-2 rounded-xl border border-neutral-200 dark:border-neutral-800 p-3">
            {/* Docked HUD tagline (no occlusion over nodes) */}
            <div className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="rounded-full border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/75 backdrop-blur px-3 py-1 text-xs">
                    {facet.tagline}
                </div>
            </div>

            <svg viewBox="0 0 600 120" className="w-full h-[120px]">
                {/* connecting lines */}
                {lines.map(([a, b], i) => {
                    const A = nodes.find(n => n.id === a)!;
                    const B = nodes.find(n => n.id === b)!;
                    return (
                        <g key={i}>
                            <motion.line
                                x1={A.x}
                                y1={A.y}
                                x2={B.x}
                                y2={B.y}
                                stroke="currentColor"
                                strokeOpacity={0.22}
                                strokeWidth={2}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.08 * i }}
                            />
                            {/* subtle shimmer accent behind nodes */}
                            <motion.line
                                x1={A.x}
                                y1={A.y}
                                x2={B.x}
                                y2={B.y}
                                stroke={tint}
                                strokeWidth={2}
                                strokeOpacity={0.35}
                                strokeDasharray="4 12"
                                animate={{ strokeDashoffset: [24, 0] }}
                                transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
                            />
                        </g>
                    );
                })}

                {/* nodes */}
                {nodes.map((n) => {
                    const isActive = active === n.id;
                    return (
                        <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                            {/* soft glow behind active */}
                            {isActive && (
                                <circle r={20} fill={tint} opacity={0.16} style={{ filter: "blur(10px)" }} />
                            )}
                            {/* orbiting tiny star */}
                            {isActive && (
                                <motion.g animate={{ rotate: 360 }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }}>
                                    <circle cx={0} cy={-20} r={2.2} fill={tint} opacity={0.9} />
                                </motion.g>
                            )}
                            {/* node */}
                            <motion.circle
                                r={10}
                                className="cursor-pointer"
                                fill="currentColor"
                                style={{ opacity: isActive ? 0.95 : 0.6 }}
                                onClick={() => onPick(n.id)}
                                whileHover={{ scale: 1.06 }}
                                transition={{ duration: 0.15 }}
                                aria-label={`Select ${n.id}`}
                            />
                            {/* label moved BELOW to avoid overlap */}
                            <text x={0} y={22} textAnchor="middle" className="text-sm fill-current opacity-80 select-none">
                                {FACETS.find(f => f.id === n.id)?.title.split(" — ")[0]}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}



/* ===== Facet detail card ===== */
function FacetPanel({ id }: { id: FacetId }) {
    const facet = FACETS.find(f => f.id === id)!;
    const hue: Record<string, string> = {
        sky: "text-sky-400",
        emerald: "text-emerald-400",
        rose: "text-rose-400",
        violet: "text-violet-400",
    };

    return (
        <motion.div
            key={id}
            className="mt-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
        >
            {/* subtle accent bar */}
            <div className={`h-1.5 w-16 rounded-full mb-3 ${hue[facet.hue]}`} />

            <div className="text-sm mb-1 opacity-70">Focus</div>
            <div className="text-lg font-semibold">{facet.title}</div>
            <p className="opacity-80 mt-1">{facet.blurb}</p>

            {/* chips */}
            {facet.chips?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                    {facet.chips.map((c) => (
                        <span
                            key={c}
                            className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700"
                        >
                            {c}
                        </span>
                    ))}
                </div>
            ) : null}
        </motion.div>
    );
}


/* ===== Curved timeline (sorted + animated highlight) ===== */
function Timeline() {
    type Item = { year: string; title: string; txt: string };

    // ---- helpers: parse year strings like "2024–2025" / "2025" / "Ongoing"
    const startYear = (y: string): number => {
        if (/ongoing/i.test(y)) return 3000; // put "Ongoing" last
        const m = y.match(/\d{4}/g);
        return m ? parseInt(m[0], 10) : 0;
    };
    // ---- sort direction + ordered items
    const [dir, setDir] = useState<"asc" | "desc">("asc");
    const ordered: Item[] = useMemo(() => {
        const arr = [...TIMELINE];
        arr.sort((a, b) =>
            dir === "asc" ? startYear(a.year) - startYear(b.year) : startYear(b.year) - startYear(a.year)
        );
        return arr;
    }, [dir]);

    // ---- layout + active hover state
    const h = 160;
    const width = 760;
    const pad = 24;
    const xAt = (i: number, total: number) => pad + (i / (total - 1)) * (width - pad * 2);
    const yAt = (i: number) => (i % 2 === 0 ? h * 0.35 : h * 0.7);

    const [activeIdx, setActiveIdx] = useState(ordered.length - 1);
    useEffect(() => setActiveIdx(ordered.length - 1), [ordered.length]); // keep last active when resorting

    // base curve
    const d = `M ${pad},${h * 0.6}
             C ${width * 0.25},${h * 0.1}
               ${width * 0.55},${h * 1.1}
               ${width - pad},${h * 0.5}`;

    const progress = ordered.length > 1 ? activeIdx / (ordered.length - 1) : 1;

    return (
        <div className="w-full overflow-hidden">
            {/* header row with sort toggle */}
            <div className="mb-2 flex items-center justify-between">
                <div className="text-sm opacity-70">
                    {dir === "asc" ? "Oldest → Newest" : "Newest → Oldest"}
                </div>
                <button
                    onClick={() => setDir(dir === "asc" ? "desc" : "asc")}
                    className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                    Toggle order
                </button>
            </div>

            {/* SVG curve */}
            <svg viewBox={`0 0 ${width} ${h}`} className="w-full">
                {/* base path */}
                <motion.path
                    d={d}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity={0.18}
                    strokeWidth={10}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7 }}
                />
                {/* animated highlight up to active */}
                <motion.path
                    d={d}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity={0.35}
                    strokeWidth={6}
                    style={{ filter: "blur(1px)" }}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: Math.max(0.03, progress) }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                />
                {/* nodes */}
                {ordered.map((t, i) => {
                    const cx = xAt(i, ordered.length);
                    const cy = yAt(i);
                    const isActive = i === activeIdx;
                    return (
                        <g key={`${t.title}-${i}`} transform={`translate(${cx}, ${cy})`}>
                            {/* pulse on active */}
                            {isActive && (
                                <motion.circle
                                    r={16}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeOpacity={0.4}
                                    strokeWidth={3}
                                    className="pointer-events-none"
                                    initial={{ opacity: 0, scale: 1 }}
                                    animate={{ opacity: 0.4, scale: 1.22 }}
                                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
                                />
                            )}
                            {/* node */}
                            <motion.circle
                                r={12}
                                fill="white"
                                className="dark:fill-neutral-950 cursor-pointer"
                                stroke="currentColor"
                                strokeWidth={isActive ? 4 : 3}
                                onMouseEnter={() => setActiveIdx(i)}
                                whileHover={{ scale: 1.07 }}
                                transition={{ duration: 0.15 }}
                            />
                            {/* year label */}
                            <text
                                x={0}
                                y={-20}
                                textAnchor="middle"
                                className="text-xs fill-current opacity-85 select-none"
                            >
                                {t.year}
                            </text>
                            {/* title tooltip (accessible) */}
                            <title>{t.title}: {t.txt}</title>
                        </g>
                    );
                })}
            </svg>

            {/* details grid (same order, active highlighted) */}
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
                {ordered.map((t, i) => (
                    <li
                        key={`${t.title}-${i}`}
                        onMouseEnter={() => setActiveIdx(i)}
                        className={`rounded-xl border p-3 transition
              ${i === activeIdx
                                ? "border-sky-400/40 dark:border-sky-400/40 bg-sky-50/30 dark:bg-sky-900/10"
                                : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900"}`}
                    >
                        <div className="font-semibold">{t.title}</div>
                        <div className="text-sm opacity-75">{t.year}</div>
                        <p className="opacity-85 mt-1">{t.txt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}


/* ===== Flip card (3D with crossfade to prevent overlap) ===== */
function FlipCard({ front, back }: { front: string; back: string }) {
    return (
        <div className="group relative h-32 [perspective:1000px]">
            <div className="absolute inset-0 rounded-xl border border-neutral-200 dark:border-neutral-800 transition-transform duration-500 transform-gpu [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front face */}
                <div className="absolute inset-0 grid place-items-center [backface-visibility:hidden] transition-opacity duration-300 group-hover:opacity-0">
                    <div className="text-lg font-semibold">{front}</div>
                </div>
                {/* Back face */}
                <div className="absolute inset-0 grid place-items-center [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-xl p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="text-sm opacity-80 text-center">{back}</div>
                </div>
            </div>
        </div>
    );
}

/* ===== Marquee (auto-scrolling strip) ===== */
function Marquee({ items }: { items: string[] }) {
    const row = [...items, ...items];
    return (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <motion.div
                className="flex gap-6 whitespace-nowrap px-4 py-3 text-sm"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            >
                {row.map((t, i) => (
                    <span key={i} className="opacity-80">• {t}</span>
                ))}
            </motion.div>
        </div>
    );
}

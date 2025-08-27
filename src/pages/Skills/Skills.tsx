import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** ──────────────────────────────────────────────────────────────────────────
 * Data model
 * ────────────────────────────────────────────────────────────────────────── */
type StageId =
    | "foundations"
    | "frontend"
    | "datasci"
    | "bioinfo"
    | "commlead"
    | "advocacy";

type Stage = {
    id: StageId;
    title: string;
    blurb: string;
    color: string; // tailwind-like token names for classes
    skills: string[];
};

const STAGES: Stage[] = [
    {
        id: "foundations",
        title: "Foundations",
        blurb:
            "Core programming, data structures, and web fundamentals I use everywhere.",
        color: "sky",
        skills: [
            "Python",
            "JavaScript",
            "HTML/CSS",
            "Git/GitHub",
            "SQL",
            "Jupyter/Colab",
            "FastAPI",
            "Tailwind",
        ],
    },
    {
        id: "frontend",
        title: "Frontend / UI",
        blurb:
            "Turning ideas into accessible, responsive interfaces with motion and polish.",
        color: "fuchsia",
        skills: ["React", "Recharts", "ArcGIS", "Looker Studio", "Vercel", "Render"],
    },
    {
        id: "datasci",
        title: "Data Science",
        blurb:
            "From cleaning and visualizing data to modeling and exploratory analysis.",
        color: "emerald",
        skills: [
            "Pandas",
            "SciPy",
            "scikit-learn",
            "Seaborn",
            "Matplotlib",
            "Plotly",
            "PCA",
        ],
    },
    {
        id: "bioinfo",
        title: "Bioinformatics",
        blurb:
            "Applying data methods to biology: RNA-seq, differential expression, enrichment.",
        color: "amber",
        skills: [
            "RNA-seq analysis",
            "DE analysis",
            "Enrichment (g:Profiler)",
            "Visualization",
        ],
    },
    {
        id: "commlead",
        title: "Communication & Leadership",
        blurb:
            "Leading teams and telling clear stories: writing, presenting, mentoring.",
        color: "violet",
        skills: [
            "Award-winning writer",
            "Technical writing",
            "UX-focused docs",
            "Presentations (PwC)",
            "Presentations (Rep. Bowman team)",
            "Presentations (Apple Fifth Ave.)",
            "Peer mentoring",
            "Team coordination",
            "STEM org president",
        ],
    },
    {
        id: "advocacy",
        title: "Advocacy & Impact",
        blurb:
            "Building for education and civic tech; using code where it matters.",
        color: "rose",
        skills: ["LearnLoom (education)", "Civic tech (Miranda)", "Public ed (OurChoice)"],
    },
];

/** Utility: map token to Tailwind color classes */
function colorClasses(color: string) {
    // light background + readable text + border; dark variants too
    switch (color) {
        case "sky":
            return {
                chip: "bg-sky-100 text-sky-900 border-sky-200 dark:bg-sky-900/40 dark:text-sky-100 dark:border-sky-800",
                strong: "text-sky-600 dark:text-sky-300",
                stroke: "#38bdf8",
            };
        case "fuchsia":
            return {
                chip: "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200 dark:bg-fuchsia-900/40 dark:text-fuchsia-100 dark:border-fuchsia-800",
                strong: "text-fuchsia-600 dark:text-fuchsia-300",
                stroke: "#e879f9",
            };
        case "emerald":
            return {
                chip: "bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-100 dark:border-emerald-800",
                strong: "text-emerald-600 dark:text-emerald-300",
                stroke: "#34d399",
            };
        case "amber":
            return {
                chip: "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-900/40 dark:text-amber-100 dark:border-amber-800",
                strong: "text-amber-600 dark:text-amber-300",
                stroke: "#fbbf24",
            };
        case "violet":
            return {
                chip: "bg-violet-100 text-violet-900 border-violet-200 dark:bg-violet-900/40 dark:text-violet-100 dark:border-violet-800",
                strong: "text-violet-500 dark:text-violet-300",
                stroke: "#8b5cf6",
            };
        case "rose":
            return {
                chip: "bg-rose-100 text-rose-900 border-rose-200 dark:bg-rose-900/40 dark:text-rose-100 dark:border-rose-800",
                strong: "text-rose-600 dark:text-rose-300",
                stroke: "#f43f5e",
            };
        default:
            return {
                chip: "bg-neutral-100 text-neutral-900 border-neutral-200 dark:bg-neutral-900/40 dark:text-neutral-100 dark:border-neutral-800",
                strong: "text-neutral-600 dark:text-neutral-300",
                stroke: "#a3a3a3",
            };
    }
}

/** ──────────────────────────────────────────────────────────────────────────
 * Roadmap SVG
 * ────────────────────────────────────────────────────────────────────────── */
function Roadmap({
    active,
    onSelect,
}: {
    active: StageId;
    onSelect: (id: StageId) => void;
}) {
    // layout params
    const h = 180;
    const padX = 75;
    const step = 1 / (STAGES.length - 1); // normalized spacing along 0..1
    const points = STAGES.map((_, i) => i * step);

    // path is a smooth bezier going left to right
    const path = `M ${padX},${h * 0.65}
    C ${padX + 180},${h * 0.15}
      ${padX + 420},${h * 1.15}
      ${padX + 640},${h * 0.6}
    S ${padX + 980},${h * 0.1}
      ${padX + 1200},${h * 0.65}`;

    // map normalized t to x position along the viewBox width (approx evenly spaced)
    const width = 1232; // 1200 + pad left/right
    const xAt = (t: number) => Math.round(padX + t * (width - padX * 2));

    // simple inline icons per stage (stroke-only for clarity)
    function Icon({ id, stroke }: { id: StageId; stroke: string }) {
        const common = { stroke, strokeWidth: 2, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as any;
        switch (id) {
            case "foundations":
                // terminal window
                return (
                    <g {...common}>
                        <rect x={-9} y={-7} width={18} height={14} rx={2} />
                        <path d="M -6 -3 L -2 0 L -6 3" />
                        <path d="M -1 3 H 5" />
                    </g>
                );
            case "frontend":
                // cursor/selection
                return (
                    <g {...common}>
                        <path d="M -6 -8 L 6 4 L 1 5 L 0 10 Z" />
                        <path d="M 4 -6 L 8 -10" />
                    </g>
                );
            case "datasci":
                // line chart
                return (
                    <g {...common}>
                        <path d="M -8 6 H 8" />
                        <path d="M -8 6 V -6" />
                        <path d="M -6 3 L -2 -1 L 2 0 L 6 -4" />
                        <circle cx={-6} cy={3} r={1.2} fill={stroke} />
                        <circle cx={-2} cy={-1} r={1.2} fill={stroke} />
                        <circle cx={2} cy={0} r={1.2} fill={stroke} />
                        <circle cx={6} cy={-4} r={1.2} fill={stroke} />
                    </g>
                );
            case "bioinfo":
                // tiny DNA-ish helix
                return (
                    <g {...common}>
                        <path d="M -6 -6 C -2 -2, -2 2, -6 6" />
                        <path d="M 6 -6 C 2 -2, 2 2, 6 6" />
                        <path d="M -4 -4 H 4" />
                        <path d="M -4 0 H 4" />
                        <path d="M -4 4 H 4" />
                    </g>
                );
            case "commlead":
                // megaphone
                return (
                    <g {...common}>
                        <path d="M -8 -2 L -2 -4 L -2 4 L -8 2 Z" />
                        <path d="M -2 -4 L 2 -5 L 2 5 L -2 4 Z" />
                        <path d="M -7 1 L -5 6" />
                    </g>
                );
            case "advocacy":
                // heart
                return (
                    <g {...common}>
                        <path d="M 0 6 C -4 2, -6 0, -6 -2 C -6 -4, -4 -6, -2 -6 C -1 -6, 0 -5, 0 -4" />
                        <path d="M 0 6 C 4 2, 6 0, 6 -2 C 6 -4, 4 -6, 2 -6 C 1 -6, 0 -5, 0 -4" />
                    </g>
                );
        }
    }


    return (
        <div className="w-full overflow-hidden">
            <svg
                viewBox={`0 0 ${width} ${h}`}
                className="w-full"
                role="group"
                aria-label="Interactive skills roadmap"
            >
                {/* base path */}
                <motion.path
                    d={path}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity={0.15}
                    strokeWidth={10}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8 }}
                />
                {/* animated highlight behind the active node */}
                <motion.path
                    d={path}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity={0.25}
                    strokeWidth={14}
                    strokeLinecap="round"
                    style={{ filter: "blur(10px)" }}
                    initial={{ pathLength: 0, pathOffset: 1 }}
                    animate={{ pathLength: points.indexOf(points[STAGES.findIndex(s => s.id === active)]) * step + 0.01, pathOffset: 0 }}
                    transition={{ duration: 0.8 }}
                />
                {/* nodes */}
                {STAGES.map((stage, i) => {
                    const cx = xAt(points[i]);
                    const cy = i % 2 === 0 ? h * 0.35 : h * 0.75;
                    const isActive = active === stage.id;
                    const color = colorClasses(stage.color);
                    const closing: Record<StageId, string> = {
                        foundations: "These tools let me prototype quickly and ship reliable features.",
                        frontend: "I focus on accessible, responsive UI with clear hierarchy and motion.",
                        datasci: "My analyses emphasize interpretability and reproducible notebooks.",
                        bioinfo: "I’ve run RNA-seq pipelines and communicated findings to non-technical audiences.",
                        commlead: "I mentor peers and maintain clear docs to keep teams moving.",
                        advocacy: "I build for classrooms and civic projects because technology should serve people.",
                    };
                    return (
                        <g key={stage.id} transform={`translate(${cx}, ${cy})`}>
                            <motion.circle
                                r={isActive ? 14 : 10}
                                fill="white"
                                className="dark:fill-neutral-950"
                                stroke={color.stroke}
                                strokeWidth={isActive ? 6 : 4}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                            {/* inline icon */}
                            <g className={isActive ? "icon-bob" : ""} aria-hidden="true">
                                <Icon id={stage.id} stroke={color.stroke} />
                            </g>
                            {/* clickable ring */}
                            <motion.circle
                                r={28}
                                fill="transparent"
                                className="cursor-pointer"
                                onClick={() => onSelect(stage.id)}
                                whileHover={{ scale: 1.05 }}
                                aria-label={`Select ${stage.title}`}
                            />
                            {/* label */}
                            <motion.text
                                x={0}
                                y={isActive ? -32 : -28}
                                textAnchor={i === 0 ? "start" : i === STAGES.length - 1 ? "end" : "middle"}
                                className={`text-base font-semibold fill-white ${isActive ? "glow-label" : ""}`}
                            >
                                {stage.title}
                            </motion.text>

                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

/** ──────────────────────────────────────────────────────────────────────────
 * Skills view per stage
 * ────────────────────────────────────────────────────────────────────────── */
function StagePanel({ stage }: { stage: Stage }) {
    const color = colorClasses(stage.color);
    // Stage-specific outcome sentence
    const closing: Record<StageId, string> = {
        foundations: "These tools let me prototype quickly and ship reliable features.",
        frontend: "I focus on accessible, responsive UI with clear hierarchy and motion.",
        datasci: "My analyses emphasize interpretability and reproducible notebooks.",
        bioinfo: "I’ve run RNA-seq pipelines and communicated findings to non-technical audiences.",
        commlead: "I mentor peers and maintain clear docs to keep teams moving.",
        advocacy: "I build for classrooms and civic projects because technology should serve people.",
    };
    return (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className={`text-xl font-semibold ${color.strong}`}>{stage.title}</h3>
                    <p className="opacity-80">{stage.blurb}</p>
                    <p className="opacity-80 mt-2">{closing[stage.id]}</p>
                </div>
            </div>

            <ul className="mt-2 flex flex-wrap gap-2">
                {stage.skills.map((s) => (
                    <li key={s}>
                        <span
                            className={`inline-flex items-center gap-2 rounded-xl border ${color.chip} px-3 py-1.5 text-sm`}
                            title={s}
                        >
                            <span className="inline-block h-2 w-2 rounded-full bg-current/60" />
                            {s}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/** ──────────────────────────────────────────────────────────────────────────
 * Page component
 * ────────────────────────────────────────────────────────────────────────── */
export default function Skills() {
    const [active, setActive] = useState<StageId>("foundations");
    const [playing, setPlaying] = useState(false);
    const idx = useMemo(() => STAGES.findIndex((s) => s.id === active), [active]);
    const nextId = STAGES[(idx + 1) % STAGES.length].id;

    // tiny story auto-advance
    const timerRef = useRef<number | null>(null);
    useEffect(() => {
        if (!playing) {
            if (timerRef.current) cancelAnimationFrame(timerRef.current);
            return;
        }
        const start = performance.now();
        const tick = (t: number) => {
            if (t - start > 2200) {
                setActive((prev) => {
                    const i = STAGES.findIndex((s) => s.id === prev);
                    return STAGES[(i + 1) % STAGES.length].id;
                });
            }
            timerRef.current = requestAnimationFrame(tick);
        };
        timerRef.current = requestAnimationFrame(tick);
        return () => {
            if (timerRef.current) cancelAnimationFrame(timerRef.current);
        };
    }, [playing]);

    // tint your starfield if you kept the event bridge
    useEffect(() => {
        const stage = STAGES[idx];
        window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: stage.color } }));
    }, [idx]);


    // Keyboard navigation: ← / → change stage, Space toggles Play
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const tag = (document.activeElement?.tagName || "").toLowerCase();
            const isEditing =
                tag === "input" || tag === "textarea" || (document.activeElement as HTMLElement | null)?.isContentEditable;
            if (isEditing) return;
            if (e.key === "ArrowRight") {
                setActive(nextId);
            } else if (e.key === "ArrowLeft") {
                setActive(prevId);
            } else if (e.key === " ") {
                e.preventDefault();
                setPlaying((v) => !v);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [nextId, prevId]);

    return (
        <section className="space-y-8">
            <header className="space-y-2">
                <h1 className="text-3xl font-semibold">Skills — Interactive Roadmap</h1>
                <p className="opacity-80">
                    A brief story of how my skills connect—from core programming to bioinformatics and education technology.
                </p>
            </header>

            {/* Roadmap */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
                <Roadmap active={active} onSelect={(id) => setActive(id)} />
                <p className="mt-2 text-sm opacity-75">
                    Use <strong>Play</strong> for a quick tour; click any milestone for details and examples.
                </p>
                <div className="mt-3 flex items-center gap-2">
                    <button
                        onClick={() => setActive(prevId)}
                        className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    >
                        ← Prev
                    </button>
                    <button
                        onClick={() => setPlaying((v) => !v)}
                        className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        aria-pressed={playing}
                    >
                        {playing ? "Pause" : "Play"} story
                    </button>
                    <button
                        onClick={() => setActive(nextId)}
                        className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    >
                        Next →
                    </button>
                    <span className="text-sm opacity-70">Currently: {STAGES[idx].title}</span>
                </div>
            </div>

            {/* Active stage panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                >
                    <StagePanel stage={STAGES[idx]} />
                </motion.div>
            </AnimatePresence>

            {/* Secondary: the whole map at a glance */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
                <h3 className="text-lg font-semibold mb-3">All stages at a glance</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    {STAGES.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setActive(s.id)}
                            className={`text-left rounded-xl border px-4 py-3 transition ${s.id === active
                                ? "border-black/20 dark:border-white/20"
                                : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                                }`}
                        >
                            <div className={`text-sm ${colorClasses(s.color).strong}`}>{s.title}</div>
                            <div className="opacity-80 text-sm">{s.blurb}</div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

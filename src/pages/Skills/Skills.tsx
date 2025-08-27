//src/pages/Skills/Skills.tsx
import { useMemo, useState } from "react";

type Item = { id: number; label: string; tags: string[] };
const SAMPLE: Item[] = [
    { id: 1, label: "Bioluminescent UI background", tags: ["ui", "css", "creative"] },
    { id: 2, label: "Poetry modal with markdown", tags: ["react", "ux", "content"] },
    { id: 3, label: "Projects last-updated badge", tags: ["data", "details"] },
    { id: 4, label: "Tag filtering animations", tags: ["animation", "ux"] },
    { id: 5, label: "Download poem as .txt", tags: ["browser apis"] },
];

export default function Skills() {
    // Demo 1: micro-interaction button states
    const [saving, setSaving] = useState(false);
    function fakeSave() {
        setSaving(true);
        setTimeout(() => setSaving(false), 900);
    }

    // Demo 2: accessible form with simple validation
    const [email, setEmail] = useState("");
    const [err, setErr] = useState<string | null>(null);
    function submit(e: React.FormEvent) {
        e.preventDefault();
        const ok = /\S+@\S+\.\S+/.test(email);
        setErr(ok ? null : "Please enter a valid email.");
    }

    // Demo 3: live filter widget+  const [q, setQ] = useState("");
    const [q, setQ] = useState("");
    const [chip, setChip] = useState<string>("ALL");
    const tags = useMemo(() => Array.from(new Set(SAMPLE.flatMap(i => i.tags))).sort(),
        []
    );
    const filtered = useMemo(() => {
        const base = chip === "ALL" ? SAMPLE : SAMPLE.filter(i => i.tags.includes(chip));
        if (!q.trim()) return base;
        const qq = q.toLowerCase();
        return base.filter(i => i.label.toLowerCase().includes(qq));
    }, [q, chip]);

    // Demo 4: download JSON (browser API)
    function downloadJSON() {
        const blob = new Blob([JSON.stringify({ skills: SAMPLE }, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "skills-demo.json";
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <section className="space-y-8">
            <header className="space-y-2">
                <h1 className="text-3xl font-semibold">Skills</h1>
                <p className="opacity-80">
                    Small, focused demos that show craft without noise: micro-interactions, a11y, state, and browser APIs.
                </p>
            </header>

            {/* Demo 1: Micro-interactions */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <h2 className="text-xl font-semibold mb-3">Micro-interactions</h2>
                <p className="opacity-80 mb-4">Buttons that communicate state clearly.</p>
                <div className="flex gap-2">
                    <button
                        onClick={fakeSave}
                        disabled={saving}
                        className={`rounded-xl px-4 py-2 border border-neutral-300 dark:border-neutral-700
                        hover:bg-neutral-100 dark:hover:bg-neutral-900
                        transition-all ${saving ? "opacity-70 cursor-wait" : ""}`}
                        aria-live="polite"
                    >
                        {saving ? "Saving…" : "Save"}
                    </button>
                    <button
                        className="rounded-xl px-4 py-2 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                    >
                        Hover me
                    </button>
                    <button
                        className="rounded-xl px-4 py-2 border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 outline-none"
                    >
                        Focus me (Tab)
                    </button>
                </div>
            </div>

            {/* Demo 2: Accessible form */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <h2 className="text-xl font-semibold mb-3">Accessible Form</h2>
                <form onSubmit={submit} noValidate className="max-w-md space-y-3">
                    <label className="block">
                        <span className="text-sm">Email</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                            aria-invalid={!!err}
                            aria-describedby={err ? "email-err" : undefined}
                            placeholder="you@skylar.rocks"
                        />
                    </label>
                    {err && (
                        <p id="email-err" className="text-sm text-red-600 dark:text-red-400">{err}</p>
                    )}
                    <button
                        type="submit"
                        className="rounded-xl px-4 py-2 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    >
                        Submit
                    </button>
                </form>
            </div>

            {/* Demo 3: Stateful list + chips */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <h2 className="text-xl font-semibold mb-3">Stateful Filter</h2>
                <div className="flex flex-col gap-3">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search demos…"
                        className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                    />
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setChip("ALL")}
                            className={`px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 ${chip === "ALL" ? "bg-neutral-200 dark:bg-neutral-800" : ""}`}
                        >
                            All
                        </button>
                        {tags.map(t => (
                            <button
                                key={t}
                                onClick={() => setChip(t)}
                                className={`px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 ${chip === t ? "bg-neutral-200 dark:bg-neutral-800" : ""}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <ul className="grid gap-2 sm:grid-cols-2">
                        {filtered.map(i => (
                            <li key={i.id} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-3">
                                <div className="font-medium">{i.label}</div>
                                <div className="mt-1 flex flex-wrap gap-1">
                                    {i.tags.map(t => (
                                        <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700">{t}</span>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Demo 4: Download JSON */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <h2 className="text-xl font-semibold mb-3">Browser API: Download</h2>
                <p className="opacity-80 mb-3">Generate and download a JSON file client-side.</p>
                <button
                    onClick={downloadJSON}
                    className="rounded-xl px-4 py-2 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                    Download skills-demo.json
                </button>
            </div>

            {/* Demo 5: Design Tokens (colors & spacing) */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <h2 className="text-xl font-semibold mb-3">Design Tokens</h2>
                <p className="opacity-80 mb-4">
                    A small sample of color and spacing tokens I use across the site.
                </p>

                {/* Color chips */}
                <div className="mb-6">
                    <div className="text-sm font-medium mb-2">Colors</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {[
                            { name: "Neutral-200", cls: "bg-neutral-200 text-neutral-900" },
                            { name: "Neutral-800", cls: "bg-neutral-800 text-white" },
                            { name: "Sky-400", cls: "bg-sky-400 text-neutral-900" },
                            { name: "Fuchsia-400", cls: "bg-fuchsia-400 text-neutral-900" },
                            { name: "Emerald-400", cls: "bg-emerald-400 text-neutral-900" },
                            { name: "Amber-300", cls: "bg-amber-300 text-neutral-900" },
                        ].map((c) => (
                            <div
                                key={c.name}
                                className={`rounded-xl border border-neutral-300 dark:border-neutral-700 p-3 ${c.cls}`}
                            >
                                <div className="text-xs font-medium">{c.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Spacing scale */}
                <div>
                    <div className="text-sm font-medium mb-2">Spacing (Tailwind units)</div>
                    <div className="space-y-2">
                        {[2, 4, 6, 8, 10, 12].map((s) => (
                            <div key={s} className="flex items-center gap-3">
                                <div className="w-24 text-xs opacity-80">p-{s}</div>
                                <div className="flex-1 border border-dashed border-neutral-300 dark:border-neutral-700 rounded">
                                    <div className={`bg-neutral-200 dark:bg-neutral-800 rounded h-4`} style={{ width: `${s * 6}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

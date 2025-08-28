import { useEffect, useState } from "react";
import Starfield from "@/components/Starfield";

export default function Resume() {
    const [showPreview, setShowPreview] = useState(false);

    // calm "emerald" tint for resume page
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: "emerald" } }));
        return () => {
            window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: "neutral" } }));
        };
    }, []);

    return (
        <section className="space-y-6">
            {/* Header */}
            <header className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <Starfield
                    density={0.45}
                    speed={0.6}
                    className="opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
                />
                <div className="relative z-10 space-y-2">
                    <h1 className="text-3xl font-semibold">Resume</h1>
                    <p className="opacity-80">Open as PDF or print directly.</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        >
                            Open resume.pdf
                        </a>
                        <button
                            onClick={() => window.print()}
                            className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        >
                            Print
                        </button>
                        <button
                            onClick={() => setShowPreview((v) => !v)}
                            aria-expanded={showPreview}
                            className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        >
                            {showPreview ? "Hide preview" : "Show inline preview"}
                        </button>
                    </div>
                </div>
            </header>

            {/* Collapsible inline preview */}
            {showPreview && (
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    <iframe
                        src="/resume.pdf"
                        title="Resume preview"
                        className="w-full h-[80vh] bg-white dark:bg-neutral-950"
                    />
                </div>
            )}
        </section>
    );
}

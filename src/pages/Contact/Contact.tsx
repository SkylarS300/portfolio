import { useEffect, useState } from "react";
import Starfield from "@/components/Starfield";
import { Mail, Copy, Check, Download, Github, Linkedin } from "lucide-react";

const EMAIL = "skylarksky1234@gmail.com";
const GITHUB = "https://github.com/SkylarS300";
const LINKEDIN = "https://www.linkedin.com/in/skylar-schulsohn-50b10b304/";

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const [subject, setSubject] = useState("Hi, Sky!");
    const [message, setMessage] = useState("");

    // warm "amber" tint for contact page
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: "amber" } }));
        return () => {
            window.dispatchEvent(new CustomEvent("stars:theme", { detail: { theme: "neutral" } }));
        };
    }, []);

    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // fallback: open a mailto as a gentle nudge
            window.location.href = `mailto:${EMAIL}`;
        }
    }

    function composeMailto() {
        const url = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            message + "\n\n— Sent from your portfolio site"
        )}`;
        window.location.href = url;
    }

    function downloadVCard() {
        const vcard = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            "FN:Skylar",
            "N:;Skylar;;;",
            `EMAIL;TYPE=INTERNET:${EMAIL}`,
            `URL:${GITHUB}`,
            `URL:${LINKEDIN}`,
            "NOTE:Generated from portfolio site",
            "END:VCARD",
        ].join("\n");
        const blob = new Blob([vcard], { type: "text/vcard" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Skylar-Contact.vcf";
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <section className="space-y-6">
            {/* Star header */}
            <header className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <Starfield
                    density={0.45}
                    speed={0.6}
                    className="opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
                />
                <div className="relative z-10 space-y-2">
                    <h1 className="text-3xl font-semibold">Contact</h1>
                    <p className="opacity-80">Thank you for taking a look at my portfolio! If you'd like to contact me, a mini postcard composer is below.</p>
                </div>
            </header>

            {/* Two-up: methods + postcard */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Card: methods */}
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 space-y-4">
                    <div className="flex items-center gap-2">
                        <Mail size={18} />
                        <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                        <button
                            onClick={copyEmail}
                            className="ml-auto inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 px-2.5 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                            title="Copy email address"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <a
                            href={GITHUB}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        >
                            <Github size={16} /> GitHub
                        </a>
                        <a
                            href={LINKEDIN}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        >
                            <Linkedin size={16} /> LinkedIn
                        </a>
                        <button
                            onClick={downloadVCard}
                            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                            title="Save a vCard"
                        >
                            <Download size={16} /> Save contact (.vcf)
                        </button>
                    </div>

                    <p className="text-sm opacity-70">
                        Want a quicker reply? Let me know which program you’re with and the times that work best for you! :)
                    </p>
                </div>

                {/* Card: postcard composer */}
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 space-y-3">
                    <div>
                        <label className="block text-sm opacity-80 mb-1">Subject</label>
                        <input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                            placeholder="Subject"
                        />
                    </div>
                    <div>
                        <label className="block text-sm opacity-80 mb-1">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={6}
                            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                            placeholder="Write a quick note…"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={composeMailto}
                            className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        >
                            Open email draft
                        </button>
                        <button
                            onClick={copyEmail}
                            className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        >
                            {copied ? "Copied!" : "Copy address"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

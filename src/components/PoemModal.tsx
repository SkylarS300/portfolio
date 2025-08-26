import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    date?: string;
    content: string; // markdown/plaintext with \n
};

export default function PoemModal({ open, onClose, title, date, content }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />

            {/* Dialog */}
            <div className="relative z-10 w-full max-w-3xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xl">
                {/* Header */}
                <div className="px-6 pt-6 pb-3">
                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    {date ? <p className="text-sm opacity-70 mt-1">{date}</p> : null}
                </div>

                {/* Content (scrolls, respects line breaks & spacing) */}
                <div className="px-6 pb-6 max-h-[75vh] overflow-y-auto">
                    <article className="leading-relaxed whitespace-pre-wrap prose dark:prose-invert max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkBreaks]}
                            // Optional: small tweak so paragraphs have breathing room
                            components={{
                                p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </article>
                </div>
            </div>
        </div>
    );
}

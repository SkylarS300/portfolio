// Type + adapter around your JS export so TS pages can import safely
import { poems as raw } from "@/content/poems.js";

export type Poem = {
    slug: string;
    title: string;
    date: string;     // "YYYY-MM" or YYYY-MM-DD
    tags: string[];
    content: string;  // markdown allowed
};

function slugify(s: string) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const poems: Poem[] = raw.map((p: any) => ({
    slug: p.slug ?? slugify(p.title || "untitled"),
    title: p.title ?? "Untitled",
    date: p.date ?? "",
    tags: Array.isArray(p.tags) ? p.tags : [],
    content: String(p.content ?? ""),
}));

// Convenience: list of unique tags (sorted)
export const poemTags = Array.from(
    new Set(poems.flatMap((p) => p.tags ?? []))
).sort();

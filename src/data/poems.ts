export type Poem = {
    slug: string;
    title: string;
    date: string;       // YYYY-MM
    tags: string[];
    content: string;    // preserve italics/spacing
};

export const poems: Poem[] = [
    {
        slug: "microgravity",
        title: "The Microgravity of Unsaid Things",
        date: "2025-07",
        tags: ["queerness", "longing", "memory"],
        content: "_the room glows_\nwith a patience I borrowed\nfrom the sea…"
    },
    // add more…
];

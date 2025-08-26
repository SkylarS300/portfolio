export type Project = {
    slug: string;
    title: string;
    summary: string;
    role: string;
    year: string;
    tags: string[];
    image?: string;
    links?: { label: string; href: string }[];
    lastUpdated?: string; // ISO
    featured?: boolean;
};

// Order: best first for AOs; set featured=true for top ones
export const projects: Project[] = [
    {
        slug: "learnloom",
        title: "LearnLoom",
        summary:
            "Privacy-first reading & grammar companion I built to restore confidence for students at my school.",
        role: "Full-stack (Next.js, MySQL, vanilla CSS); product & UX",
        year: "2024–2025",
        tags: ["education", "privacy", "web"],
        image: "/media/learnloom.png",                  // TODO: replace with real screenshot
        links: [
            { label: "Live site", href: "https://(your-url-here)" },
            { label: "GitHub", href: "https://github.com/(your-repo)" },
        ],
        lastUpdated: "2025-08-20",
        featured: true,
    },
    {
        slug: "transcriptome-visualizer",
        title: "Transcriptome Visualizer + DE Explorer",
        summary:
            "React + FastAPI tool for PCA, differential expression, and enrichment to explore real RNA-seq datasets.",
        role: "Front-end React; Python API; data viz (Recharts/Plotly)",
        year: "2025",
        tags: ["bioinformatics", "react", "python"],
        image: "/media/transcriptome.png",              // TODO placeholder
        links: [
            { label: "Live demo", href: "https://(your-url-here)" },
            { label: "GitHub", href: "https://github.com/(your-repo)" },
        ],
        featured: true,
    },
    {
        slug: "bioinformatics-portfolio",
        title: "Bioinformatics Research Portfolio",
        summary:
            "Independent studies in gene expression (biomarkers, circadian dysregulation, tumor vs fetal mitosis).",
        role: "Data analysis (Pandas/Scanpy), visualization, scientific writing",
        year: "2025",
        tags: ["research", "genomics", "notebooks"],
        image: "/media/research-portfolio.png",         // TODO placeholder
        links: [
            { label: "Site / Notebooks", href: "https://(your-portfolio-url)" },
            { label: "GitHub", href: "https://github.com/(your-repo)" },
        ],
        featured: true,
    },
    {
        slug: "miranda",
        title: "Miranda — Rights Assistant",
        summary:
            "A friendly rights-assistant chatbot powered by JSON legal data + LLM backend; deployed for easy access.",
        role: "Full-stack; prompt design; deployment",
        year: "2024",
        tags: ["civics", "nlp", "web"],
        image: "/media/miranda.png",                    // TODO placeholder
        links: [
            { label: "Live site", href: "https://(your-url-here)" },
            { label: "GitHub", href: "https://github.com/(your-repo)" },
        ],
    },
    {
        slug: "ourchoice",
        title: "OurChoice — Access Visualizations",
        summary:
            "100+ data visualizations with ArcGIS and JS to illuminate access patterns and policy impacts.",
        role: "Data wrangling; mapping; storytelling",
        year: "2024",
        tags: ["data-viz", "advocacy", "maps"],
        image: "/media/ourchoice.png",                  // TODO placeholder
        links: [
            { label: "Gallery", href: "https://(your-url-here)" },
            { label: "GitHub", href: "https://github.com/(your-repo)" },
        ],
    },
];

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

    // NEW (optional callouts for detail page)
    results?: string[];
    impact?: string[];
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
        image: "/media/learnloom.png", // TODO: replace with real screenshot
        links: [
            { label: "Live site", href: "https://learnloom.xyz" },
            { label: "GitHub", href: "https://github.com/SkylarS300/learn-loom-next-dev" },
        ],
        lastUpdated: "2025-08-20",
        featured: true,
        results: [
            "Implemented text-to-speech, adaptive grammar quizzes, and reading tools.",
            "Built privacy-first progress tracking (anonymous codes + password-locked uploads).",
            "Deployed Next.js + MySQL stack; added teacher dashboard and CSV export.",
        ],
        impact: [
            "Piloted by peers in ELA classes as a Tier 2 literacy intervention.",
            "Positive feedback from teachers on clarity of progress tracking and ease of use.",
        ],
    },
    {
        slug: "transcriptome-visualizer",
        title: "Transcriptome Visualizer + DE Explorer",
        summary:
            "React + FastAPI tool for PCA, differential expression, and enrichment to explore real RNA-seq datasets.",
        role: "Front-end React; Python API; data viz (Recharts/Plotly)",
        year: "2025",
        tags: ["bioinformatics", "react", "python"],
        image: "/media/transcriptome.png", // TODO placeholder
        links: [
            { label: "Live demo", href: "https://transcriptome-explorer.vercel.app/" },
            { label: "GitHub", href: "https://github.com/SkylarS300/transcriptome-explorer" },
        ],
        featured: true,
        results: [
            "Added PCA, DE analysis, enrichment (g:Profiler) and volcano plots.",
            "Validated metadata and provided downloadable CSVs for downstream work.",
            "UMAP and session persistence in progress.",
        ],
        impact: [
            "Used to explore public RNA-seq datasets and communicate findings to peers.",
            "Formed the basis of my bioinformatics case studies and presentations.",
        ],
    },
    {
        slug: "bioinformatics-portfolio",
        title: "Bioinformatics Research Portfolio",
        summary:
            "Independent studies in gene expression (biomarkers, circadian dysregulation, tumor vs fetal mitosis).",
        role: "Data analysis (Pandas/Scanpy), visualization, scientific writing",
        year: "2025",
        tags: ["research", "genomics", "notebooks"],
        image: "/media/research-portfolio.png", // TODO placeholder
        links: [
            { label: "Site / Notebooks", href: "https://skylars300.github.io/bioinformatics-portfolio/" },
            { label: "GitHub", href: "https://github.com/SkylarS300/bioinformatics-portfolio" },
        ],
        featured: true,
        results: [
            "Circadian dysregulation analysis highlighted RAB24 (↓) and WDR75 (↑).",
            "Tumor vs fetal comparison: tumors cluster with high-proliferation fetal tissues; markers include MKI67, PLK1.",
            "Breast cancer subtype analysis via edgeR/limma-voom showed mitotic enrichment and lipid metabolism shifts.",
        ],
        impact: [
            "Demonstrated end-to-end RNA-seq workflow competence (QC → DE → enrichment → visualization).",
            "Strengthened scientific communication through concise figures and write-ups.",
        ],
    },
    {
        slug: "miranda",
        title: "Miranda — Rights Assistant",
        summary:
            "A friendly rights-assistant chatbot powered by JSON legal data + LLM backend; deployed for easy access.",
        role: "Full-stack; prompt design; deployment",
        year: "2024",
        tags: ["civics", "nlp", "web"],
        image: "/media/miranda.png", // TODO placeholder
        links: [
            { label: "Live site", href: "https://miranda-webapp.vercel.app/" },
            { label: "GitHub", href: "https://github.com/SkylarS300/miranda-webapp" },
        ],
        results: [
            "Aggregated rights info into a queryable JSON corpus; built prompt templates for reliable answers.",
            "Created a lightweight web UI with fast routes for common scenarios.",
            "Deployed with simple logging for improvement loops.",
        ],
        impact: [
            "Presented in community tech showcases, including Apple Fifth Avenue.",
            "Helped peers quickly look up rights info in plain language.",
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
        image: "/media/ourchoice.png", // TODO placeholder
        links: [
            { label: "Gallery", href: "https://ourchoice.vercel.app/" },
            { label: "GitHub", href: "https://github.com/SkylarS300/ourchoice" },
        ],
        results: [
            "Cleaned and joined multi-source datasets; produced 100+ interactive charts/maps.",
            "Built a small JS tooling layer for consistent styles and legends.",
        ],
        impact: [
            "Reached 10k+ views across posts and gallery pages.",
            "Used by classmates and community groups to understand regional access differences.",
        ],
    },
];

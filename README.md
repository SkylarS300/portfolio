# Skylar’s Portfolio — Personal & Creative

I write code and poetry to make sense of complicated worlds.

This site is a narrative-forward portfolio for college applications. It prioritizes **personality and clarity** while showcasing **technical craft**: dark mode, smooth routing, searchable/filterable content, and polished modals — all without distractions.

---

## Highlights

- **Poetry** — Grid of titles with **tag filtering**. Modal preserves **line breaks/spacing** using `remark-breaks`, with a **scrolling body** so long poems stay readable.
- **Projects** — Cards with **featured-first** order for admissions. Each detail page includes **role**, **year**, **summary**, **tags**, **links**, and a screenshot.
- **Design** — **Dark/light** theme toggle (persisted), responsive layout, and optional typography polish.
- **Code Quality** — TypeScript with strict mode, path alias `@/*`, clean file structure, and Vite for fast dev.

---

## Structure

portfolio-site/
├─ public/
│  ├─ resume.pdf # placeholder ok
│  └─ media/ # screenshots (placeholders ok)
│     ├─ learnloom.png
│     ├─ transcriptome.png
│     ├─ research-portfolio.png
│     ├─ miranda.png
│     └─ ourchoice.png
├─ src/
│  ├─ app/
│  │  ├─ App.tsx
│  │  └─ routes.tsx
│  ├─ components/
│  │  ├─ Navbar.tsx
│  │  ├─ Footer.tsx
│  │  └─ PoemModal.tsx
│  ├─ content/
│  │  └─ poems.js # your poems source (JS export)
│  ├─ data/
│  │  ├─ poems.ts # TS adapter (slugify, tags list)
│  │  └─ projects.ts # project metadata
│  ├─ pages/
│  │  ├─ Home/Home.tsx
│  │  ├─ About/About.tsx
│  │  ├─ Projects/Projects.tsx
│  │  ├─ Projects/ProjectDetail.tsx
│  │  ├─ Poetry/Poetry.tsx
│  │  ├─ Resume/Resume.tsx
│  │  └─ Contact/Contact.tsx
│  ├─ styles/tailwind.css
│  └─ main.tsx
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig.json
├─ vite.config.ts
└─ package.json

---

## Quickstart

**Prereqs:** Node 18+

npm i          # install
npm run dev    # dev → open http://localhost:5173
npm run build  # build
npm run preview

---

## Content: Poems

`src/content/poems.js`

export const poems = [
  {
    title: "The Microgravity of Unsaid Things",
    date: "2025-07",
    tags: ["queerness", "longing", "memory"],
    content: "_the room glows_\nwith a patience I borrowed\nfrom the sea…"
  },
  // add more…
];

- **Formatting:** line breaks are respected via remark-breaks. Multiple spaces and manual wrapping are preserved by whitespace-pre-wrap.  
- **Tags:** optional but recommended (used for filters).  
- **Slugs:** generated automatically from titles in `src/data/poems.ts`.  

**Adding new poems:** paste new objects at the end of the array. Dates can be "YYYY-MM".

---

## Content: Projects

`src/data/projects.ts` controls ordering and details.

export const projects = [
  {
    slug: "learnloom",
    title: "LearnLoom",
    summary: "Privacy-first reading & grammar companion used at my school.",
    role: "Full-stack (Next.js, MySQL); product & UX",
    year: "2024–2025",
    tags: ["education", "privacy", "web"],
    image: "/media/learnloom.png",
    links: [
      { label: "Live site", href: "https://…" },
      { label: "GitHub", href: "https://…" }
    ],
    lastUpdated: "2025-08-20",
    featured: true
  },
  // …
];

---

## Styling (Tailwind v4)

This repo uses Tailwind v4 with the new PostCSS plugin.

`src/styles/tailwind.css`

@import "tailwindcss";

`postcss.config.js`

export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

- **Dark mode:** toggled via the class strategy and a simple button in the Navbar.

Optional typography:

npm i -D @tailwindcss/typography

Add to `tailwind.config.js`:

export default {
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [require('@tailwindcss/typography')],
};

---


## Accessibility & UX

- Keyboard-focusable modal close button.  
- Neutral color palette with dark mode.  
- Readable line-height and white-space preservation in poems.  

---

## Tech Notes

- **Aliases:** `@` → `src/` (see vite.config.ts and tsconfig.json).  
- **Node types:** `@types/node` and `"types": ["node"]` so Vite config can use `node:path`.  
- **ESM-safe __dirname:** in Vite config via `fileURLToPath(new URL('.', import.meta.url))`.

---

## License

Personal portfolio — content © Skylar.  
Feel free to reference structure and code with attribution.
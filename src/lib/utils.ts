// b/src/lib/utils.ts
// Lightweight utilities

/** Format ISO date (e.g., "2025-08-20") to "Aug 20, 2025" */
export function formatDate(iso?: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso; // fallback if not ISO
    return new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
    }).format(d);
}

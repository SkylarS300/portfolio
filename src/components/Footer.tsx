export default function Footer() {
    return (
        <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800 py-8 text-sm opacity-80">
            <div className="mx-auto max-w-6xl px-4">
                © {new Date().getFullYear()} Skylar — Last updated recently
            </div>
        </footer>
    );
}

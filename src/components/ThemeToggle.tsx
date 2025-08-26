import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const [dark, setDark] = useState(
        typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved) setDark(saved === 'dark');
    }, []);

    return (
        <button
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-2"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
        >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}

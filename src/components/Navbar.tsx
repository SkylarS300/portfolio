import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    // close on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    // close when clicking outside
    useEffect(() => {
        if (!open) return;
        const onClick = (e: MouseEvent) => {
            const t = e.target as Node;
            if (!menuRef.current || !btnRef.current) return;
            if (!menuRef.current.contains(t) && !btnRef.current.contains(t)) setOpen(false);
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [open]);

    const linkCls = ({ isActive }: any) =>
        `px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 ${isActive ? 'font-semibold' : ''
        }`;

    return (
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-neutral-950/70 backdrop-blur">
            <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <Link to="/" className="font-bold text-base sm:text-lg">Skylar • Portfolio</Link>

                {/* Desktop nav */}
                <div className="hidden sm:flex items-center gap-1">
                    <NavLink to="/about" className={linkCls}>About</NavLink>
                    <NavLink to="/projects" className={linkCls}>Projects</NavLink>
                    <NavLink to="/poetry" className={linkCls}>Poetry</NavLink>
                    <NavLink to="/skills" className={linkCls}>Skills</NavLink>
                    <NavLink to="/resume" className={linkCls}>Resume</NavLink>
                    <NavLink to="/contact" className={linkCls}>Contact</NavLink>
                </div>

                {/* Mobile hamburger */}
                <button
                    ref={btnRef}
                    className="sm:hidden inline-flex items-center justify-center rounded-lg border border-neutral-300 dark:border-neutral-700 px-2.5 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    aria-controls="mobile-menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <span className="sr-only">Toggle menu</span>
                    {/* simple hamburger / close */}
                    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                        {open ? (
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        ) : (
                            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile menu panel */}
            <div
                id="mobile-menu"
                ref={menuRef}
                className={`sm:hidden border-t border-neutral-200 dark:border-neutral-800 transition-[max-height] duration-200 overflow-hidden ${open ? 'max-h-96' : 'max-h-0'}`}
            >
                <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-1 pb-4">
                    <NavLink to="/about" className={linkCls} onClick={() => setOpen(false)}>About</NavLink>
                    <NavLink to="/projects" className={linkCls} onClick={() => setOpen(false)}>Projects</NavLink>
                    <NavLink to="/poetry" className={linkCls} onClick={() => setOpen(false)}>Poetry</NavLink>
                    <NavLink to="/skills" className={linkCls} onClick={() => setOpen(false)}>Skills</NavLink>
                    <NavLink to="/resume" className={linkCls} onClick={() => setOpen(false)}>Resume</NavLink>
                    <NavLink to="/contact" className={linkCls} onClick={() => setOpen(false)}>Contact</NavLink>
                </div>
            </div>
        </header>
    );
}

import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const linkCls = ({ isActive }: any) =>
        `px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 ${isActive ? 'font-semibold' : ''}`;

    return (
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-neutral-950/70 backdrop-blur">
            <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <Link to="/" className="font-bold">Skylar • Portfolio</Link>
                <div className="flex items-center gap-1">
                    <NavLink to="/about" className={linkCls}>About</NavLink>
                    <NavLink to="/projects" className={linkCls}>Projects</NavLink>
                    <NavLink to="/poetry" className={linkCls}>Poetry</NavLink>
                    <NavLink to="/resume" className={linkCls}>Resume</NavLink>
                    <NavLink to="/contact" className={linkCls}>Contact</NavLink>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}

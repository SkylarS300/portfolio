import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <section className="space-y-8">
            <motion.h1
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-semibold"
            >
                I write code and poems for the same reason: to make sense of complicated worlds.
            </motion.h1>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                    <h2 className="text-xl font-semibold mb-2">Featured Project — LearnLoom</h2>
                    <p className="mb-4">A privacy-first reading & grammar companion I built for my school.</p>
                    <Link to="/projects" className="underline">Explore projects →</Link>
                </div>
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                    <h2 className="text-xl font-semibold mb-2">Featured Poem — (excerpt)</h2>
                    <p className="italic opacity-90">…the room glows with a patience I borrowed from the sea…</p>
                    <Link to="/poetry" className="underline">Read poetry →</Link>
                </div>
            </div>
        </section>
    );
}

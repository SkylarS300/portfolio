import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function NotFound() {
    const err = useRouteError();
    const isRR = isRouteErrorResponse(err);
    const status = isRR ? err.status : 404;
    const message = isRR ? err.statusText : "Page not found";

    return (
        <section className="space-y-4">
            <h1 className="text-3xl font-semibold">Oops — {status}</h1>
            <p className="opacity-80">{message}</p>
            <div className="flex gap-3">
                <Link className="underline" to="/">Go home</Link>
                <Link className="underline" to="/projects">See projects</Link>
            </div>
        </section>
    );
}

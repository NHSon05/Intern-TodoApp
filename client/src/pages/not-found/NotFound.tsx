import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-slate-100">
      <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-slate-900/80 p-10 text-center shadow-2xl shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-300/80">
          404 error
        </p>
        <h1 className="mt-5 text-4xl font-semibold text-white">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-400">
          The page you were looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/login"
          className="mt-8 inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}

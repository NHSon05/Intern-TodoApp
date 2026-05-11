import { Link } from "react-router-dom";

interface AuthHeaderProps {
  currentPage: "login" | "register";
}

const AuthHeader = ({ currentPage }: AuthHeaderProps) => {
  return (
    <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-black/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          to="/login"
          className="flex items-center gap-3 text-white transition hover:text-sky-200"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-500/10 text-sky-300 ring-1 ring-sky-300/30 shadow-[0_0_0_1px_rgba(56,189,248,0.1)]">
            ✓
          </span>
          <span className="text-base font-semibold tracking-tight sm:text-lg">
            TaskFlow
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-sm sm:gap-4">
          <Link
            to="/login"
            className="font-medium text-slate-300 transition hover:text-white"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;

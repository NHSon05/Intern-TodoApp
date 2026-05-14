import { Link } from "react-router-dom";

interface AuthHeaderProps {
  currentPage: "login" | "register";
}

const AuthHeader = ({ currentPage }: AuthHeaderProps) => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/95 backdrop-blur-xl">
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
            className={`font-medium transition ${
              currentPage === "login"
                ? "text-white"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg transition ${
              currentPage === "register"
                ? "bg-white text-slate-950 shadow-slate-800/20 hover:bg-slate-100"
                : "bg-sky-500 text-white shadow-sky-500/20 hover:bg-sky-400"
            }`}
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;

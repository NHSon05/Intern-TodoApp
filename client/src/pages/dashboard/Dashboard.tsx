import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden bg-slate-950 px-6 py-10 sm:px-10">
        <div className="absolute inset-x-0 top-0 h-60 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 opacity-90" />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 rounded-[32px] border border-white/5 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300/70">
                  TaskFlow
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                  Welcome to your dashboard
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                  You are signed in. Use TaskFlow to build your task list and
                  stay productive.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center justify-center rounded-full bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
              >
                Sign Out
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-200 shadow-inner shadow-slate-950/20">
                <p className="text-sm font-medium text-slate-300">Tasks</p>
                <p className="mt-3 text-3xl font-semibold text-white">0</p>
                <p className="mt-2 text-sm text-slate-400">
                  Create your first task to get started.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-200 shadow-inner shadow-slate-950/20">
                <p className="text-sm font-medium text-slate-300">Account</p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  TaskFlow Demo
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Edit your profile or update your preferences later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

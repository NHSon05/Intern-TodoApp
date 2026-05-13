import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12h7v8H3z" />
        <path d="M14 3h7v17h-7z" />
      </svg>
    ),
  },
  {
    label: "All Tasks",
    to: "/all-tasks",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </svg>
    ),
  },
  {
    label: "Calendar",
    to: "/calendar",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const getIsActive = (
    _item: { to: string; label: string },
    isActive: boolean,
  ) => {
    return isActive;
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 shrink-0 flex-col border-r border-white/5 bg-black px-6 py-8 shadow-2xl md:flex">
      <div className="flex flex-col gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300 shadow-inner shadow-sky-500/5">
          <span className="text-lg font-semibold">T</span>
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400/80">
            TaskFlow
          </p>
        </div>
      </div>

      <nav className="mt-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => {
              const active = getIsActive(item, isActive);
              return `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-slate-900 text-slate-100 shadow-sm shadow-sky-500/10"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`;
            }}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-slate-300 transition group-hover:text-white">
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

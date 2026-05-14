import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { mainNavItems, settingItem, logoutIcon } from "@/constants/sibe-bar-items";

export default function Sidebar() {
  const { logout } = useAuth();

  const getIsActive = (
    _item: { to: string; label: string },
    isActive: boolean,
  ) => {
    return isActive;
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-slate-100 shadow-sm shadow-sky-500/10"
        : "text-slate-400 hover:bg-slate-900 hover:text-white"
    }`;

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

      <nav className="mt-4 flex-1 space-y-2">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => navLinkClass({ isActive: getIsActive(item, isActive) })}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-slate-300 transition group-hover:text-white">
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="mb-3 border-t border-white/5" />
        <nav className="space-y-1">
          {/* Setting */}
          <NavLink
            to={settingItem.to}
            className={({ isActive }) => navLinkClass({ isActive: getIsActive(settingItem, isActive) })}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-slate-300 transition group-hover:text-white">
              {settingItem.icon}
            </span>
            {settingItem.label}
          </NavLink>

          {/* Logout */}
          <button
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
            className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-slate-300 transition group-hover:text-red-400">
              {logoutIcon}
            </span>
            {logout.isPending ? "Logging out…" : "Logout"}
          </button>
        </nav>
      </div>
    </aside>
  );
}

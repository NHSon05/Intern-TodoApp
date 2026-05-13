import type { ChangeEvent } from "react";
import { TASK_STATUSES } from "../../constants/taskStatus";

export interface TopActionBarProps {
  searchValue: string;
  statusValue: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onNewTask: () => void;
}

export default function TopActionBar({
  searchValue,
  statusValue,
  onSearchChange,
  onStatusChange,
  onNewTask,
}: TopActionBarProps) {
  return (
    <div className="rounded-[28px] border border-white p-4 shadow-xl backdrop-blur-xl sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1 lg:max-w-md">
          <label className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-500">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              value={searchValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search by title..."
              className="w-full rounded-full border border-white/10 bg-slate-950/90 py-3 pl-12 pr-4 text-sm text-slate-100 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-500/10"
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            value={statusValue}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              onStatusChange(event.target.value)
            }
            className="min-w-[150px] rounded-full border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-500/10"
          >
            <option value="All Status" className="bg-slate-950 text-slate-100">
              All Status
            </option>
            {TASK_STATUSES.map((status) => (
              <option
                key={status}
                value={status}
                className="bg-slate-950 text-slate-100"
              >
                {status}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={onNewTask}
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            + New Task
          </button>
        </div>
      </div>
    </div>
  );
}

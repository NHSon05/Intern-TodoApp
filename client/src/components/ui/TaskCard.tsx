import type { Task } from "../../types/task";
import { STATUS_DOT_STYLES, STATUS_STYLES } from "../../constants/taskStatus";

interface TaskCardProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function formatDueDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.valueOf())) {
    return date;
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export default function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  return (
    <article className="rounded-[26px] border border-white/10 bg-slate-950/95 p-5 shadow-slate-950/40 transition hover:-translate-y-0.5 hover:bg-slate-900/95">
      <div className="flex gap-4">
        <div className="mt-1 flex h-4 w-4 items-center justify-center">
          <span
            className={`h-3.5 w-3.5 rounded-full ${STATUS_DOT_STYLES[task.status]}`}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {task.title}
              </p>
              <p className="mt-1 truncate text-sm text-slate-400">
                {task.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold border ${STATUS_STYLES[task.status]}`}
              >
                {task.status}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              <span className="font-medium text-slate-200">Due</span>{" "}
              {formatDueDate(task.dueDate)}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit(task.id)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Edit task"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-rose-500/10 hover:text-rose-300"
                aria-label="Delete task"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4h8v2" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

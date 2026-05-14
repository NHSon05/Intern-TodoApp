import type { TaskResponse } from "@/types/task.type";
import { STATUS_DOT_STYLES } from "@/constants/taskStatus";

interface TaskCardProps {
  task: TaskResponse;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
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

        <div
          className="min-w-0 flex-1"
          onClick={() => onEdit(Number(task.id))}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {task.title}
              </p>
              <p className="mt-1 truncate text-sm text-slate-400">
                {task.description}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              <span className="font-medium text-slate-200">Due</span>{" "}
              {formatDueDate(task.dueDate)}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(Number(task.id));
              }}
              className="inline-flex items-center justify-center rounded-full text-sm font-semibold text-rose-400 transition hover:text-rose-500"
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
              <span className="ml-1">Delete Task</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

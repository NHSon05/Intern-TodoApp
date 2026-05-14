import type { TaskStatus } from "@/types/task.type";

export const TASK_STATUSES: TaskStatus[] = [
  "NEW",
  "ACTIVE",
  "PROGRESS",
  "REMIND",
  "DONE",
  "CLOSED",
];
export const STATUS_STYLES: Record<TaskStatus, string> = {
  NEW: "bg-slate-700/50 text-slate-200 border border-slate-600/50",
  ACTIVE: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
  PROGRESS: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  REMIND: "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30",
  DONE: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  CLOSED: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
};

export const STATUS_COLORS: Record<TaskStatus, string> = {
  NEW: "bg-slate-500 text-white",
  ACTIVE: "bg-sky-500 text-white",
  PROGRESS: "bg-amber-500 text-white",
  REMIND: "bg-fuchsia-500 text-white",
  DONE: "bg-emerald-500 text-white",
  CLOSED: "bg-rose-500 text-white",
};

export const STATUS_DOT_STYLES: Record<TaskStatus, string> = {
  NEW: "bg-slate-400",
  ACTIVE: "bg-sky-400",
  PROGRESS: "bg-amber-400",
  REMIND: "bg-fuchsia-400",
  DONE: "bg-emerald-400",
  CLOSED: "bg-rose-400",
};

export type TaskStatus = "New" | "Active" | "In Progress" | "Done" | "Closed";
export type TaskCategory = "Homework" | "Work";

export const TASK_STATUSES: TaskStatus[] = [
  "New",
  "Active",
  "In Progress",
  "Done",
  "Closed",
];
export const TASK_CATEGORIES: TaskCategory[] = ["Homework", "Work"];

export const STATUS_STYLES: Record<TaskStatus, string> = {
  New: "bg-slate-700/50 text-slate-200 border border-slate-600/50",
  Active: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
  "In Progress": "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  Done: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  Closed: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
};

export const STATUS_COLORS: Record<TaskStatus, string> = {
  New: "bg-slate-500 text-white",
  Active: "bg-sky-500 text-white",
  "In Progress": "bg-amber-500 text-white",
  Done: "bg-emerald-500 text-white",
  Closed: "bg-rose-500 text-white",
};

export const STATUS_DOT_STYLES: Record<TaskStatus, string> = {
  New: "bg-slate-400",
  Active: "bg-sky-400",
  "In Progress": "bg-amber-400",
  Done: "bg-emerald-400",
  Closed: "bg-rose-400",
};

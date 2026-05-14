import { useState } from "react";
import type { TaskRequest, TaskResponse } from "@/types/task.type";
import { TASK_STATUSES } from "@/constants/taskStatus";
import { toast } from "sonner";

interface TaskPopUpProps {
  open: boolean;
  isPending: boolean;
  taskToEdit?: TaskResponse | null;
  onClose: () => void;
  onSubmit: (data: TaskRequest) => void;
}

const initialValue: TaskRequest = {
  title: "",
  description: "",
  status: "NEW",
  scheduleDate: "",
  dueDate: ""
};

const getInitialForm = (task?: TaskResponse | null): TaskRequest => {
  if (task) {
    return {
      title: task.title,
      description: task.description ?? "",
      status: task.status ?? "NEW",
      scheduleDate: task.scheduleDate ? task.scheduleDate.slice(0, 16) : "",
      dueDate: task.dueDate ? task.dueDate.slice(0, 16) : ""
    };
  }
  return initialValue;
};

export default function TaskPopUp({
  open,
  isPending,
  taskToEdit,
  onClose,
  onSubmit,
}: TaskPopUpProps) {
  const [form, setForm] = useState<TaskRequest>(() => getInitialForm(taskToEdit))

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.dueDate) {
      toast.warning("Please fill in all required fields");
      return;
    };
    onSubmit(form);
    if (!taskToEdit) {
      setForm(initialValue);
    }
  };

  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-[28px] border border-white/10 bg-slate-950/95 p-8 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
        <h2 className="text-xl font-semibold text-white">
          {taskToEdit ? "Edit Task" : "New Task"}
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          {taskToEdit ? "Update the task details below." : "Fill in the details for your new task."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="task-title" className="block text-sm font-medium text-slate-200">
              Title
            </label>
            <input
              id="task-title"
              name="title" 
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="Task title"
              autoFocus
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-500/10"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="task-description" className="block text-sm font-medium text-slate-200">
              Description
            </label>
            <textarea
              id="task-description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              placeholder="Optional description…"
              className="w-full resize-none rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-500/10"
              required
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label htmlFor="task-status" className="block text-sm font-medium text-slate-200">
              Status
            </label>
            <select
              id="task-status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-500/10"
            >
              {TASK_STATUSES.map((status) => (
                <option key={status} value={status} className="bg-slate-950">
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="task-schedule" className="block text-sm font-medium text-slate-200">
                Schedule Date
              </label>
              <input
                id="task-schedule"
                name="scheduleDate"
                type="datetime-local"
                value={form.scheduleDate}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-500/10"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="task-due" className="block text-sm font-medium text-slate-200">
                Due Date
              </label>
              <input
                id="task-due"
                name="dueDate"
                type="datetime-local"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-500/10"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending || !form.title.trim()}
              className="flex-1 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:opacity-50"
            >
              {isPending ? "Saving…" : taskToEdit ? "Save Changes" : "Create Task"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

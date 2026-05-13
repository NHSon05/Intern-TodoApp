import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import type { NewTaskPayload, Task } from "../../types/task";
import { TASK_STATUSES, TASK_CATEGORIES } from "../../constants/taskStatus";

interface NewTaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreateTask: (task: NewTaskPayload) => void;
  onUpdateTask: (taskId: string, task: NewTaskPayload) => void;
  taskToEdit: Task | null;
}

export default function NewTaskModal({
  open,
  onClose,
  onCreateTask,
  onUpdateTask,
  taskToEdit,
}: NewTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<NewTaskPayload["status"]>("New");
  const [category, setCategory] =
    useState<NewTaskPayload["category"]>("Homework");

  useEffect(() => {
    if (open && taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
      setStatus(taskToEdit.status);
      setCategory(taskToEdit.category);
      return;
    }

    if (!open) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("New");
      setCategory("Homework");
    }
  }, [open, taskToEdit]);

  const isEditing = Boolean(taskToEdit);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: NewTaskPayload = {
      title,
      description,
      dueDate,
      status,
      category,
    };

    if (isEditing && taskToEdit) {
      onUpdateTask(taskToEdit.id, payload);
    } else {
      onCreateTask(payload);
    }

    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("New");
    setCategory("Homework");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? "Edit Task" : "Create New Task"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-200"
            htmlFor="task-title"
          >
            Title
          </label>
          <input
            id="task-title"
            name="title"
            type="text"
            value={title}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
            placeholder="Task title"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-500/10"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-200"
            htmlFor="task-description"
          >
            Description
          </label>
          <textarea
            id="task-description"
            name="description"
            rows={4}
            value={description}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(event.target.value)
            }
            placeholder="Describe the task"
            className="min-h-[120px] w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-500/10"
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-200"
              htmlFor="task-category"
            >
              Category
            </label>
            <select
              id="task-category"
              name="category"
              value={category}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setCategory(event.target.value as NewTaskPayload["category"])
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-500/10"
            >
              {TASK_CATEGORIES.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="bg-slate-950 text-slate-100"
                >
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-200"
              htmlFor="task-status"
            >
              Status
            </label>
            <select
              id="task-status"
              name="status"
              value={status}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setStatus(event.target.value as NewTaskPayload["status"])
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-500/10"
            >
              {TASK_STATUSES.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="bg-slate-950 text-slate-100"
                >
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-200"
              htmlFor="task-due-date"
            >
              Due Date
            </label>
            <input
              id="task-due-date"
              name="dueDate"
              type="date"
              value={dueDate}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setDueDate(event.target.value)
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-500/10"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
          >
            {isEditing ? "Confirm" : "Create Task"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

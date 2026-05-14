import TaskCard from "../../pages/dashboard/components/TaskCard";
import type { Task } from "../../types/task.type";

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  emptyMessage?: string;
}

export default function TaskSection({
  title,
  tasks,
  onEdit,
  onDelete,
  emptyMessage = "No tasks in this section yet.",
}: TaskSectionProps) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-400">
            {title}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {tasks.length} task{tasks.length === 1 ? "" : "s"}
          </p>
        </div>
        <span className="rounded-full bg-slate-800/70 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="rounded-[26px] border border-dashed border-white/10 bg-slate-950/80 p-10 text-center text-sm text-slate-400">
            {emptyMessage}
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}

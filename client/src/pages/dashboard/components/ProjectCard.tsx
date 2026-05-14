import TaskCard from "@/pages/dashboard/components/TaskCard";
import { TASK_STATUSES, STATUS_DOT_STYLES } from "@/constants/taskStatus";
import type { TaskRequest, TaskResponse } from "@/types/task.type";
import { useCreateTask, useDeleteTask, useGetTasks, useUpdateTask } from "@/hooks/useTask";
import { useMemo, useState } from "react";
import TaskPopUp from "./TaskPopUp";
import { toast } from "sonner";

interface ProjectCardProps {
  projectId: number;
  projectName: string;
  onEditProject: () => void;
  onDeleteProject: () => void;
}

export default function ProjectCard({
  projectId,
  projectName,
  onEditProject,
  onDeleteProject,
}: ProjectCardProps) {

  const { data: fetchedTasks, isLoading: getTasksLoading } = useGetTasks(projectId);
  const tasks = useMemo(() => fetchedTasks ?? [], [fetchedTasks]);

  const createTasks = useCreateTask(projectId);
  const updateTasks = useUpdateTask(projectId);
  const deleteTasks = useDeleteTask(projectId);

  const [taskPopUpOpen, setTaskPopUpOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskResponse | null>(null);

  const tasksByStatus = useMemo(() => {
    const grouped = TASK_STATUSES.reduce<Record<string, TaskResponse[]>>(
      (acc, status) => ({...acc, [status]: []}), {}
    )
    tasks.forEach((t) => {
      if (grouped[t.status]) {
        grouped[t.status].push(t);
      }
    });

    Object.keys(grouped).forEach((status) => {
      grouped[status].sort((a, b) => a.title.localeCompare(b.title));
    });

    return grouped;
  }, [tasks])

  const handleOpenCreate = () => {
    setTaskToEdit(null);
    setTaskPopUpOpen(true);
  };

  const handleOpenEdit = (taskId: number) => {
    const task = tasks.find((t) => Number(t.id) === taskId);
    if (!task) return;
    setTaskToEdit(task);
    setTaskPopUpOpen(true);
  };

  const handleSubmitTask = async (data: TaskRequest) => {
    try {
      if (taskToEdit) {
        await updateTasks.mutateAsync({ id: Number(taskToEdit.id), data });
        toast.success("Task updated!");
      } else {
        await createTasks.mutateAsync(data);
        toast.success("Task created!");
      }
      setTaskPopUpOpen(false);
    } catch (error) {
      toast.error("Failed to create or update task");
      console.error(error)
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTasks.mutateAsync(taskId);
      toast.success("Task deleted!");
    } catch (error) {
      toast.error("Failed to delete task");
      console.error(error)
    }
  };
  return (
    <>
      <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
        {/* Project header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">{projectName}</h2>
            <p className="mt-1 text-sm text-slate-400">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Create Task */}
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Create Task
            </button>

            {/* Edit project */}
            <button
              type="button"
              onClick={onEditProject}
              className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Edit project"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </button>

            {/* Delete project */}
            <button
              type="button"
              onClick={onDeleteProject}
              className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-rose-500/10 hover:text-rose-300"
              aria-label="Delete project"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Task board — always expanded */}
        <div className="mt-6">
          {getTasksLoading ? (
            <div className="py-10 text-center text-sm text-slate-500">Loading tasks…</div>
          ) : tasks.length === 0 ? (
            <div className="rounded-[26px] border border-dashed border-white/10 bg-slate-950/80 p-10 text-center text-sm text-slate-400">
              No tasks yet. Click <strong className="text-white">Create Task</strong> to add one.
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto h-[60vh] pb-4 custom-scrollbar">
              {TASK_STATUSES.map((status) => {
                const statusTasks = tasksByStatus[status] ?? [];
                return (
                  <div key={status} className="space-y-4 min-w-[280px] sm:min-w-[320px] shrink-0">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${STATUS_DOT_STYLES[status]}`} />
                      <h3 className="text-sm font-semibold text-slate-300">{status}</h3>
                      <span className="text-xs text-slate-500">({statusTasks.length})</span>
                    </div>
                    <div className="space-y-3 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
                      {statusTasks.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-white/5 bg-slate-950/50 p-4 text-center text-xs text-slate-500">
                          No tasks
                        </div>
                      ) : (
                        statusTasks.map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={handleOpenEdit}
                            onDelete={handleDeleteTask}
                          />
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <TaskPopUp
        key={taskToEdit ? taskToEdit.id : 'new-task'}
        open={taskPopUpOpen}
        isPending={createTasks.isPending || updateTasks.isPending}
        taskToEdit={taskToEdit}
        onClose={() => setTaskPopUpOpen(false)}
        onSubmit={handleSubmitTask}
      />
    </>
  );
}

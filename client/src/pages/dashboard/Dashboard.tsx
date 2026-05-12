import { useMemo, useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import NewTaskModal from "../../components/ui/NewTaskModal";
import TaskCard from "../../components/ui/TaskCard";
import type { NewTaskPayload, Task } from "../../types/task";
import { useTaskContext } from "../../context/TaskContext";
import { TASK_STATUSES } from "../../constants/taskStatus";

export default function Dashboard() {
  const { tasks, createTask, updateTask, deleteTask } = useTaskContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<Task["category"], boolean>
  >({
    Homework: true,
    Work: true,
  });

  const tasksByCategoryAndStatus = useMemo(() => {
    const result: Record<Task["category"], Record<Task["status"], Task[]>> = {
      Homework: {
        New: [],
        Active: [],
        "In Progress": [],
        Done: [],
        Closed: [],
      },
      Work: {
        New: [],
        Active: [],
        "In Progress": [],
        Done: [],
        Closed: [],
      },
    };

    tasks.forEach((task) => {
      result[task.category][task.status].push(task);
    });

    return result;
  }, [tasks]);

  const toggleSection = (category: Task["category"]) => {
    setExpandedSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleOpenModal = () => setIsCreateModalOpen(true);
  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setTaskToEdit(null);
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;
    setTaskToEdit(task);
    setIsCreateModalOpen(true);
  };

  const handleCreateTask = (payload: NewTaskPayload) => {
    createTask(payload);
    handleCloseModal();
  };

  const handleUpdateTask = (taskId: string, payload: NewTaskPayload) => {
    updateTask(taskId, payload);
    handleCloseModal();
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <Sidebar />
      <main className="min-h-screen md:ml-72">
        <div className="border-b border-white/10 px-4 py-4 shadow-sm shadow-slate-950/10 md:px-8">
          <div className="mx-auto flex max-w-10xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300/80">
                Dashboard
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-white">
                Track your Homework and Work tasks.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                View all tasks organized by category with their current status.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              + New Task
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-10xl px-4 py-8 md:px-8">
          <div className="space-y-8">
            {(["Homework", "Work"] as Task["category"][]).map((category) => {
              const categoryTasks = Object.values(
                tasksByCategoryAndStatus[category],
              ).flat();
              const isExpanded = expandedSections[category];

              return (
                <div
                  key={category}
                  className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(category)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold text-white">
                        {category}
                      </h2>
                      <p className="mt-1 text-sm text-slate-400">
                        {categoryTasks.length} task
                        {categoryTasks.length === 1 ? "" : "s"}
                      </p>
                    </div>
                    <svg
                      className={`h-5 w-5 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="mt-6">
                      {categoryTasks.length === 0 ? (
                        <div className="rounded-[26px] border border-dashed border-white/10 bg-slate-950/80 p-10 text-center text-sm text-slate-400">
                          No {category.toLowerCase()} tasks yet.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                          {TASK_STATUSES.map((status) => {
                            const statusTasks =
                              tasksByCategoryAndStatus[category][status];
                            return (
                              <div key={status} className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-slate-400" />
                                  <h3 className="text-sm font-semibold text-slate-300">
                                    {status}
                                  </h3>
                                  <span className="text-xs text-slate-500">
                                    ({statusTasks.length})
                                  </span>
                                </div>
                                <div className="space-y-3">
                                  {statusTasks.length === 0 ? (
                                    <div className="rounded-lg border border-dashed border-white/5 bg-slate-950/50 p-4 text-center text-xs text-slate-500">
                                      No tasks
                                    </div>
                                  ) : (
                                    statusTasks.map((task) => (
                                      <TaskCard
                                        key={task.id}
                                        task={task}
                                        onEdit={handleEditTask}
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
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <NewTaskModal
          open={isCreateModalOpen}
          onClose={handleCloseModal}
          onCreateTask={handleCreateTask}
          onUpdateTask={handleUpdateTask}
          taskToEdit={taskToEdit}
        />
      </main>
    </div>
  );
}

import NewTaskModal from "@/components/ui/NewTaskModal";
import Sidebar from "@/components/ui/Sidebar";
import TaskCard from "@/pages/dashboard/components/TaskCard";
import TopActionBar from "@/components/ui/TopActionBar";
import { useTaskContext } from "@/context/TaskContext";
import type { NewTaskPayload, Task } from "@/types/task.type";
import { useMemo, useState } from "react";

export default function AllTasks() {
  const { tasks, createTask, updateTask, deleteTask } = useTaskContext();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        status === "All Status" ? true : task.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, status]);

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <Sidebar />
      <main className="min-h-screen md:ml-72">
        <div className="border-b border-white/10 px-4 py-4 shadow-sm shadow-slate-950/10 md:px-8">
          <div className="mx-auto flex max-w-10xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300/80">
                All Tasks
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-white">
                Manage your entire task list.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                Filter, search, and edit tasks from the centralized task board.
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
          <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex rounded-full bg-slate-800/70 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300">
                {filteredTasks.length} tasks
              </span>
            </div>

            <div className="mb-6">
              <TopActionBar
                searchValue={search}
                statusValue={status}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onNewTask={handleOpenModal}
              />
            </div>

            <div className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="rounded-[26px] border border-dashed border-white/10 bg-slate-950/80 p-10 text-center text-sm text-slate-400">
                  No tasks match your filters. Create a new task to see it here.
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={deleteTask}
                  />
                ))
              )}
            </div>
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
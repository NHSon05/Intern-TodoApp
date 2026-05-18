import Sidebar from "@/components/ui/Sidebar";
import TaskCard from "@/pages/dashboard/components/TaskCard";
import TopActionBar from "@/components/ui/TopActionBar";
import { useState } from "react";
import type { TaskRequest, TaskResponse } from "@/types/task.type";
import TaskPopUp from "../dashboard/components/TaskPopUp";
import { useCreateTask, useDeleteTask, useGetAllTasks, useUpdateTask } from "@/hooks/useTask";
import { useGetProjects } from "@/hooks/useProject";
import { useDebounce } from "@/hooks/useDebounce";

export default function AllTasks() {
  
  const { data: projects, isPending: getProjectPending } = useGetProjects()

  const defaultProjectId = projects?.[0]?.id || 0;

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [status, setStatus] = useState("All Status");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskResponse | null>(null);
  
  const { data: tasks = [] } = useGetAllTasks(debouncedSearch, status);
  
  const { mutate: deleteTask } = useDeleteTask(defaultProjectId);
  const { mutate: updateTask, isPending: isPendingUpdate } = useUpdateTask(defaultProjectId);
  const { mutate: createTask, isPending: isPendingCreate } = useCreateTask(defaultProjectId);

  const handleOpenModal = () => setIsCreateModalOpen(true);

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setTaskToEdit(null);
  };

  const handleEditTask = (taskId: number) => {
    const task = tasks.find((item) => Number(item.id) === taskId);
    if (!task) return;
    setTaskToEdit(task);
    setIsCreateModalOpen(true);
  };

  const handleSubmitTask = (payload: TaskRequest) => {
    if (taskToEdit) {
      updateTask({ id: Number(taskToEdit.id), data: payload, projectId: taskToEdit.projectId });
    } else {
      createTask(payload);
    }
    handleCloseModal();
  };

  const handleDeleteTask = (taskId: number) => {
    if (confirm("Are you sure to delete this task?")) {
      const task = tasks.find(t => Number(t.id) === taskId);
      deleteTask({ id: taskId, projectId: task?.projectId || defaultProjectId });
    }
  };

  if (getProjectPending) {
    return <div>Loading...</div>
  }

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
          </div>
        </div>

        <div className="mx-auto max-w-10xl px-4 py-8 md:px-8">
          <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex rounded-full bg-slate-800/70 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300">
                {tasks.length} tasks
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
              {tasks.length === 0 ? (
                <div className="rounded-[26px] border border-dashed border-white/10 bg-slate-950/80 p-10 text-center text-sm text-slate-400">
                  No tasks match your filters. Create a new task to see it here.
                </div>
              ) : (
                tasks.map((task) => (
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
        </div>

        <TaskPopUp
          open={isCreateModalOpen}
          isPending={isPendingCreate || isPendingUpdate}
          onClose={handleCloseModal}
          onSubmit={handleSubmitTask}
          taskToEdit={taskToEdit}
        />
      </main>
    </div>
  );
}
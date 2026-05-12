import { useMemo, useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import NewTaskModal from "../../components/ui/NewTaskModal";
import { useTaskContext } from "../../context/TaskContext";
import type { NewTaskPayload, Task } from "../../types/task";
import { STATUS_COLORS } from "../../constants/taskStatus";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startIndex = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const weeks: Array<Array<number | null>> = [];
  let currentDay = 1;

  while (currentDay <= totalDays) {
    const week: Array<number | null> = Array(7).fill(null);

    for (let i = 0; i < 7; i++) {
      if ((weeks.length === 0 && i < startIndex) || currentDay > totalDays) {
        continue;
      }
      week[i] = currentDay;
      currentDay += 1;
    }
    weeks.push(week);
  }

  return weeks;
}

function formatMonthTitle(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function getDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function Calendar() {
  const { tasks, createTask, updateTask } = useTaskContext();
  const [activeDate, setActiveDate] = useState(() => new Date());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const year = activeDate.getFullYear();
  const month = activeDate.getMonth();

  const weeks = useMemo(() => buildCalendarGrid(year, month), [year, month]);

  const tasksByDate = useMemo(() => {
    return tasks.reduce<Record<string, Task[]>>((acc, task) => {
      acc[task.dueDate] = acc[task.dueDate]
        ? [...acc[task.dueDate], task]
        : [task];
      return acc;
    }, {});
  }, [tasks]);

  const handlePrevMonth = () => {
    setActiveDate(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setActiveDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
  };

  const handleOpenModal = () => {
    setIsCreateModalOpen(true);
  };

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
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <Sidebar />
      <main className="min-h-screen md:ml-72">
        <div className="border-b border-white/10 px-4 py-4 shadow-sm shadow-slate-950/10 md:px-8">
          <div className="mx-auto flex max-w-10xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300/80">
                Calendar View
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-white">
                Manage your tasks by due date.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                View scheduled tasks and step through the month to see what is
                due each day.
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
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {formatMonthTitle(activeDate)}
                </h2>
                <p className="text-sm text-slate-400">
                  {tasks.length} task{tasks.length === 1 ? "" : "s"} scheduled
                  this month.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-900"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-900"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px rounded-[28px] border border-white/10 bg-slate-950/80 text-center text-xs uppercase tracking-[0.25em] text-slate-500 sm:text-sm">
              {dayLabels.map((label) => (
                <div key={label} className="bg-slate-900/95 px-4 py-3">
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-7 gap-px text-sm text-slate-200">
              {weeks.map((week, index) => (
                <div key={index} className="grid gap-px">
                  {week.map((day, dayIndex) => {
                    const isToday =
                      day &&
                      new Date().getFullYear() === year &&
                      new Date().getMonth() === month &&
                      new Date().getDate() === day;
                    const dateKey = day ? getDateKey(year, month, day) : "";
                    const cellTasks = dateKey
                      ? (tasksByDate[dateKey] ?? [])
                      : [];

                    return (
                      <div
                        key={`${index}-${dayIndex}`}
                        className={`min-h-[120px] overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/95 p-3 transition ${
                          day ? "bg-slate-950" : "bg-slate-900/70"
                        } ${isToday ? "ring-2 ring-sky-500/50" : ""}`}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                          <span>{day ?? ""}</span>
                          {cellTasks.length > 0 ? (
                            <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300">
                              {cellTasks.length}
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-3 space-y-2">
                          {cellTasks.slice(0, 2).map((task) => {
                            const statusColor =
                              STATUS_COLORS[
                                task.status as keyof typeof STATUS_COLORS
                              ] || "bg-slate-500 text-white";

                            return (
                              <button
                                key={task.id}
                                type="button"
                                onClick={() => handleEditTask(task.id)}
                                className={`block w-full rounded-2xl p-2 text-left text-sm transition ${statusColor}`}
                              >
                                <span className="block truncate font-semibold">
                                  {task.title}
                                </span>
                                <span className="mt-1 block truncate text-[11px] opacity-80">
                                  Due {task.dueDate}
                                </span>
                              </button>
                            );
                          })}
                          {cellTasks.length > 2 ? (
                            <div className="text-xs text-slate-500">
                              +{cellTasks.length - 2} more
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
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

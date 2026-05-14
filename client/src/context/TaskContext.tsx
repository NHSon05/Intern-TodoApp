import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { NewTaskPayload, Task } from "../types/task.type";

interface TaskContextValue {
  tasks: Task[];
  createTask: (payload: NewTaskPayload) => void;
  updateTask: (taskId: string, payload: NewTaskPayload) => void;
  deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = (payload: NewTaskPayload) => {
    const task: Task = {
      id: crypto?.randomUUID?.() ?? `${Date.now()}`,
      title: payload.title,
      description: payload.description,
      dueDate: payload.dueDate,
      category: payload.category,
      status: payload.status ?? "New",
    };

    setTasks((current) => [task, ...current]);
  };

  const updateTask = (taskId: string, payload: NewTaskPayload) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: payload.title,
              description: payload.description,
              dueDate: payload.dueDate,
              category: payload.category,
              status: payload.status ?? task.status,
            }
          : task,
      ),
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  };

  const value = useMemo(
    () => ({ tasks, createTask, updateTask, deleteTask }),
    [tasks],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }
  return context;
}

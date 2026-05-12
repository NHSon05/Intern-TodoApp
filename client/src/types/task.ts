import type { TaskStatus, TaskCategory } from "../constants/taskStatus";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  category: TaskCategory;
}

export interface NewTaskPayload {
  title: string;
  description: string;
  dueDate: string;
  status?: TaskStatus;
  category: TaskCategory;
}

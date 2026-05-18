export type TaskStatus = "NEW" | "ACTIVE" | "PROGRESS" | "REMIND" | "DONE" | "CLOSED";

export interface TaskRequest {
  title: string;
  description: string;
  dueDate: string;
  scheduleDate: string;
  status: TaskStatus;
}

export interface TaskResponse {
  id: number;
  projectId?: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  scheduleDate: string;
  createdAt: string;
  updatedAt: string;
}
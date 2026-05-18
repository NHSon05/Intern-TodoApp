import type { TaskRequest, TaskResponse,TaskStatus } from "@/types/task.type"
import http from "@/utils/http"

export const taskApi = {
    getAllTasks: (title?: string, status?: string) => {
        const query = new URLSearchParams({ limit: '1000' });
        if (title) query.append('title', title);
        if (status && status !== 'All Status') query.append('status', status);
        return http.get<{ success: boolean; data: TaskResponse[]; message: string }>(`/tasks?${query.toString()}`)
    },
    getTasks: (projectId: number) => {
        return http.get<{ success: boolean; data: TaskResponse[]; message: string }>(`/projects/${projectId}/tasks`)
    },
    createTasks: (projectId: number, data: TaskRequest) => {
        return http.post<TaskRequest>(`/projects/${projectId}/tasks`,data)
    },
    updateTasks: (projectId: number, id: number, data: TaskRequest) => {
        return http.put<TaskRequest>(`/projects/${projectId}/tasks/${id}`,data)
    },
    updateTaskStatus: (projectId: number, id: number, data: TaskStatus) => {
        return http.patch<TaskStatus>(`/projects/${projectId}/tasks/${id}/status`, {status: data})
    },
    deleteTasks: (projectId: number, id: number) => {
        return http.delete(`/projects/${projectId}/tasks/${id}`)
    }
}   
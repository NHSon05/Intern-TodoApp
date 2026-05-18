import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { taskApi } from "@/apis/task.api"

import type { TaskStatus, TaskRequest, TaskResponse } from "@/types/task.type"

export const useGetAllTasks = (title?: string, status?: string) => {
    return useQuery({
        queryKey: ['tasks', 'all', title, status],
        queryFn: async (): Promise<TaskResponse[]> => {
            const res = await taskApi.getAllTasks(title, status);
            return res.data.data ?? [];
        },
    })
}

export const useGetTasks = (projectId: number) => {
    return useQuery({
        queryKey: ['tasks', projectId],
        queryFn: async (): Promise<TaskResponse[]> => {
            const res = await taskApi.getTasks(projectId);
            return res.data.data ?? [];
        },
        enabled: !!projectId, 
    })
}

export const useCreateTask = (projectId: number) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: TaskRequest) => taskApi.createTasks(projectId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
        }
    })
}

export const useUpdateTask = (defaultProjectId: number) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data, projectId }: { id: number; data: TaskRequest; projectId?: number }) => 
            taskApi.updateTasks(projectId || defaultProjectId, id, data),
        onSuccess: (_, variables) => {
            const pid = variables.projectId || defaultProjectId;
            queryClient.invalidateQueries({ queryKey: ['tasks', pid] });
            queryClient.invalidateQueries({ queryKey: ['tasks', 'all'] });
        }
    })
}

export const useUpdateTaskStatus = (defaultProjectId: number) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, status, projectId }: { id: number; status: TaskStatus; projectId?: number }) => 
            taskApi.updateTaskStatus(projectId || defaultProjectId, id, status),
        onSuccess: (_, variables) => {
            const pid = variables.projectId || defaultProjectId;
            queryClient.invalidateQueries({ queryKey: ['tasks', pid] });
            queryClient.invalidateQueries({ queryKey: ['tasks', 'all'] });
        }
    })
}

export const useDeleteTask = (defaultProjectId: number) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (args: number | { id: number; projectId?: number }) => {
            const id = typeof args === 'number' ? args : args.id;
            const projectId = typeof args === 'number' ? defaultProjectId : (args.projectId || defaultProjectId);
            return taskApi.deleteTasks(projectId, id);
        },
        onSuccess: (_, args) => {
            const pid = typeof args === 'number' ? defaultProjectId : (args.projectId || defaultProjectId);
            queryClient.invalidateQueries({ queryKey: ['tasks', pid] });
            queryClient.invalidateQueries({ queryKey: ['tasks', 'all'] });
        }
    })
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { taskApi } from "@/apis/task.api"
import type { TaskStatus, TaskRequest, TaskResponse } from "@/types/task.type"

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

export const useUpdateTask = (projectId: number) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: TaskRequest }) => 
            taskApi.updateTasks(projectId, id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
        }
    })
}

export const useUpdateTaskStatus = (projectId: number) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, status }: { id: number; status: TaskStatus }) => 
            taskApi.updateTaskStatus(projectId, id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
        }
    })
}

export const useDeleteTask = (projectId: number) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => taskApi.deleteTasks(projectId, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
        }
    })
}
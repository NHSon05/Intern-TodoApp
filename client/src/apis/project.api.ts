import type { ProjectRequest, ProjectResponse } from "@/types/project.type";
import http from "@/utils/http";

export const projectApi = {
    createProjects: (data: ProjectRequest) => {
        return http.post('/projects',data)
    },
    getProjects: () => {
        return http.get<{ success: boolean; data: ProjectResponse[]; message: string }>(`/projects`)  
    },
    updateProjects: (id: number, data: ProjectRequest) =>   {
        return http.put(`/projects/${id}`,data)
    },
    deleteProjects: (id: number) => {
        return http.delete(`/projects/${id}`)
    }
}
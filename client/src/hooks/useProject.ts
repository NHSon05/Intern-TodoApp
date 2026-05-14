// @/hooks/useProjects.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "@/apis/project.api"; // Đảm bảo đường dẫn import đúng với file API của em
import type { ProjectRequest } from "@/types/project.type";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await projectApi.getProjects();
      return response.data.data;
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectRequest) => projectApi.createProjects(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProjectRequest }) =>
      projectApi.updateProjects(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => projectApi.deleteProjects(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
import { useState } from "react";
import { toast } from "sonner";
import type { ProjectResponse } from "@/types/project.type";

import { useCreateProject, useDeleteProject, useGetProjects, useUpdateProject } from "@/hooks/useProject";

import Sidebar from "@/components/ui/Sidebar";
import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";
import ProjectPopUp from "./components/ProjectPopUp";

export default function Dashboard() {

  const {data: projects, isLoading } = useGetProjects()
  const createProjectMutation = useCreateProject()
  const updateProjectMutation = useUpdateProject()
  const deleteProjectMutation = useDeleteProject()

  const [projectPopUpOpen, setProjectPopUpOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectResponse | null>(null);

  const handleCreateProject = async (name: string) => {
    try {
      await createProjectMutation.mutateAsync({name})
      toast.success("Project created!");
      setProjectPopUpOpen(false);
    } catch (error) {
      toast.error("Failed to create project");
      console.error(error)
    }
  };

  const handleOpenEdit = (project: ProjectResponse) => {
    setEditingProject(project);
    setProjectPopUpOpen(true);
  };

  const handleUpdateProject = async (name: string) => {
    try {
      if (!editingProject) return;
      await updateProjectMutation.mutateAsync({id: editingProject.id, data: {name}})
      toast.success("Project updated!");
      setProjectPopUpOpen(false);
      setEditingProject(null);
    } catch (error) {
      toast.error("Failed to update project");
      console.error(error)
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProjectMutation.mutateAsync(id)
      toast.success("Project deleted!");
    } catch (error) {
      toast.error("Failed to delete project");
      console.error(error)
    }
  };

  if (isLoading) return <div>Đang tải danh sách...</div>;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <Sidebar />

      <main className="min-h-screen md:ml-72">
        {/* Header */}
        <Header setProjectPopUpOpen={setProjectPopUpOpen} setEditingProject={setEditingProject}/>

        {/* Project list */}
        <div className="mx-auto max-w-10xl px-4 py-8 md:px-8">
          {isLoading ? (
            <div className="py-20 text-center text-slate-500">Loading projects…</div>
          ) : projects.length === 0 ? (
            <div className="rounded-[32px] border border-dashed border-white/10 bg-slate-900/40 p-20 text-center">
              <p className="text-slate-400">No projects yet.</p>
              <button
                type="button"
                onClick={() => { setEditingProject(null); setProjectPopUpOpen(true); }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                + Create your first project
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {projects?.map((project) => (
                <ProjectCard
                  key={project.id}
                  projectId={project.id}
                  projectName={project.name}
                  onEditProject={() => handleOpenEdit(project)}
                  onDeleteProject={() => handleDeleteProject(project.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Project PopUp (create & edit) */}
      <ProjectPopUp
        key={editingProject ? editingProject.id : ''}
        open={projectPopUpOpen}
        isPending={createProjectMutation.isPending || updateProjectMutation.isPending}
        onClose={() => { setProjectPopUpOpen(false); setEditingProject(null); }}
        onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
        initialName={editingProject?.name}
      />
    </div>
  );
}

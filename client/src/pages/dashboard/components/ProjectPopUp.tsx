import { useState } from "react";

interface ProjectPopUpProps {
  open: boolean;
  isPending: boolean;
  initialName?: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function ProjectPopUp({
  open,
  isPending,
  initialName,
  onClose,
  onSubmit,
}: ProjectPopUpProps) {
  const [name, setName] = useState(initialName ?? "");

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim());
    setName("");
  };
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-slate-950/95 p-8 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
        <h2 className="text-xl font-semibold text-white">
            {initialName ? "Edit Project" : "New Project"}
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          {initialName ? "Edit your project name." : "Give your project a name to get started."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="project-name"
              className="block text-sm font-medium text-slate-200"
            >
              Project Name
            </label>
            <input
              id="project-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Personal Website"
              autoFocus
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-500/10"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending || !name.trim()}
              className="flex-1 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:opacity-50"
            >
              {isPending ? "Saving…" : initialName ? "Save Changes" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => { onClose(); setName(""); }}
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

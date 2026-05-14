import AppRoutes from "./routes";
import { TaskProvider } from "./context/TaskContext";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (

    <TaskProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <AppRoutes />
        <Toaster/>
      </div>
    </TaskProvider>
  );
}

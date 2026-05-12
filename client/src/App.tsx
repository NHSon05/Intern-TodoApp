import AppRoutes from "./routes";
import { TaskProvider } from "./context/TaskContext";

export default function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <AppRoutes />
      </div>
    </TaskProvider>
  );
}

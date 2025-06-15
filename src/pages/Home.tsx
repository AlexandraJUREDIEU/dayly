import { useTaskStore } from "@/store/useTaskStore";
import { KanbanBoard } from "@/components/KanbanBoard/KanbanBoard";
import type { Task } from "@/components/TaskCard/TaskCard";
import { TaskModal } from "@/components/TaskModal";

export default function Home() {
  const addTask = useTaskStore((state) => state.addTask);

  const handleAddTask = (task: Task) => {
    addTask(task);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between">
        <h1 className="md:text-2xl font-bold mb-6">Mon tableau de tâches</h1>
        <TaskModal onCreate={handleAddTask} />
      </div>
      <KanbanBoard />
    </main>
  );
}

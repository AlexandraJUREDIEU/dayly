import { useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { KanbanBoard } from "@/components/KanbanBoard/KanbanBoard";
import type { Task } from "@/components/TaskCard/TaskCard";
import { TaskModal } from "@/components/TaskModal";
import { Button } from "@/components/ui/button";

export default function Home() {
  const addTask = useTaskStore((state) => state.addTask);
  const viewMode = useTaskStore((state) => state.viewMode);
  const setViewMode = useTaskStore((state) => state.setViewMode);
  const [createOpen, setCreateOpen] = useState(false);

  const handleAddTask = (task: Task) => {
    addTask(task);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between">
        <h1 className="md:text-2xl font-bold mb-6">Mon tableau de tâches</h1>

        {/* Bouton pour ouvrir la modale de création */}
        <Button variant="outline" onClick={() => setCreateOpen(true)}>
          <span className="hidden sm:inline">Nouvelle tâche</span>
          <span className="inline sm:hidden">+</span>
        </Button>
      </div>
      <p>Vue actuelle : {viewMode}</p>
      <div className="space-x-2">
        <button onClick={() => setViewMode("kanban")}>Kanban</button>
        <button onClick={() => setViewMode("list")}>Liste</button>
        <button onClick={() => setViewMode("calendar")}>Calendrier</button>
      </div>
      <KanbanBoard />

      {/* Modale de création de tâche */}
      <TaskModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={handleAddTask}
      />
    </main>
  );
}
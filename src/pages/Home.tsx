import { useState } from "react";
import { AddTaskBar } from "@/components/AddTaskBar/AddTaskBar";
import { KanbanBoard } from "@/components/KanbanBoard/KanbanBoard";
import type { Task } from "@/components/TaskCard/TaskCard";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: uuidv4(), title: "Créer l’UI", completed: false, status: "todo", priority: "high", dueDate: "2023-10-15" },
    { id: uuidv4(), title: "Écrire les tests", completed: false, status: "in-progress", priority: "medium", dueDate: "2023-10-16" },
    { id: uuidv4(), title: "Corriger les bugs", completed: true, status: "done", priority: "low", dueDate: "2023-10-17" },
  ]);

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Mon tableau de tâches</h1>
      <AddTaskBar onAddTask={handleAddTask} />
      <KanbanBoard tasks={tasks} onToggle={handleToggleTask} />
    </main>
  );
}

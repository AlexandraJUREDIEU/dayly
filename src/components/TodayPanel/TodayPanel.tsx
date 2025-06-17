import { useState } from "react";
import type { Task } from "@/store/useTaskStore";
import { v4 as uuidv4 } from "uuid";
import { TaskList } from "../TaskList/TaskList";

export default function TodayPanel() {
    // Gestion des états et des effets
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState<string>("");

    // Fonctions 
    const handleAddTask = () => {
        if (input.trim() === "") return;
        const newTask: Task = {
            id: uuidv4(),
            title: input,
            status: "todo",
            completed: false,
        };
        setTasks((prev) => [...prev, newTask]);
        setInput("");
    }

    const handleToggleTask = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Rendu du composant
    return (
        <div className="p-4 bg-white rounded-xl shadow-md space-y-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold">Tâches du jour</h2>
            <div className="flex gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                placeholder="Ajouter une tâche"
                className="flex-1 p-2 border rounded"
            />
            <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Ajouter
            </button>
            </div>
            <TaskList tasks={tasks} onToggle={handleToggleTask} />
        </div>
    );
}
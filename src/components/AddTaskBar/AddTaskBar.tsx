import { useState } from "react";
import type { Task } from "../TaskCard/TaskCard";
import { v4 as uuidv4 } from "uuid";

type AddTaskBarProps = {
  onAddTask: (task: Task) => void;
};

export function AddTaskBar({ onAddTask }: AddTaskBarProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() === "") return;

    const newTask: Task = {
      id: uuidv4(),
      title: input,
      completed: false,
      status: "todo",
    };

    onAddTask(newTask);
    setInput("");
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Ajouter une tâche"
        className="flex-1 p-2 border rounded"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Ajouter
      </button>
    </div>
  );
}
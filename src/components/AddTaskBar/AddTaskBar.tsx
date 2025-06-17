import { useState } from "react";
import type { Task } from "@/store/useTaskStore";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Ajouter une tâche"
      />
      <Button onClick={handleSubmit}>Ajouter</Button>
    </div>
  );
}
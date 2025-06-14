import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "../TaskCard/TaskCard";

type TaskModalProps = {
  onCreate: (task: Task) => void;
};

export function TaskModal({ onCreate }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Task["status"]>("todo");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [dueDate, setDueDate] = useState<string | undefined>("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
      status,
      priority,
      dueDate: dueDate || undefined,
    };
    // DEBUG: Log the new task to console
    console.log("New Task Created:", newTask);

    onCreate(newTask);
    setTitle("");
    setStatus("todo");
    setPriority("medium");
    setDueDate("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span className="hidden sm:inline">Nouvelle tâche</span>
          <span className="inline sm:hidden">+</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Créer une tâche</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div>
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="status">Statut</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as Task["status"])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">À faire</SelectItem>
                <SelectItem value="in-progress">En cours</SelectItem>
                <SelectItem value="done">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priority">Priorité</Label>
            <Select
              value={priority}
              onValueChange={(v) => setPriority(v as Task["priority"])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">Haute</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="low">Basse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dueDate">Date d’échéance</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <Button className="mt-4 w-full" onClick={handleSubmit}>
            Ajouter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

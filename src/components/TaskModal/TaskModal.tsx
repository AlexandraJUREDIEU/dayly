import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Task["status"]>("todo");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [dueDate, setDueDate] = useState<string | undefined>("");

  const resetForm = () => {
    setTitle("");
    setStatus("todo");
    setPriority("medium");
    setDueDate("");
  };

  const handleSave = (closeAfterSave: boolean) => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
      status,
      priority,
      dueDate: dueDate || undefined,
    };

    onCreate(newTask);

    if (closeAfterSave) {
      setOpen(false);
    }

    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span className="hidden sm:inline">Nouvelle tâche</span>
          <span className="inline sm:hidden">+</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Créer une tâche</DialogTitle>
          <DialogDescription>
            Remplis les champs ci-dessous pour ajouter une nouvelle tâche à ton
            tableau.
          </DialogDescription>
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
                <SelectItem value="in_progress">En cours</SelectItem>
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

          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => handleSave(false)}>
              Sauvegarder & continuer
            </Button>
            <Button onClick={() => handleSave(true)}>
              Sauvegarder & fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

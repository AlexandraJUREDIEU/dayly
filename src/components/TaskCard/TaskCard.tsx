import { toast } from "sonner";
import { useTaskStore } from "@/store/useTaskStore";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays } from "lucide-react";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  status: "todo" | "in-progress" | "done";
  priority?: "low" | "medium" | "high";
};

type TaskCardProps = {
  task: Task;
};

function getPriorityColor(priority?: Task["priority"]) {
  switch (priority) {
    case "high":
      return "bg-red-400 rounded-md p-1 text-white";
    case "medium":
      return "bg-yellow-400 rounded-md p-1 text-black";
    case "low":
      return "bg-green-500 rounded-md p-1 text-white";
    default:
      return "bg-gray-300 rounded-md p-1 text-gray-700";
  }
}

export default function TaskCard({ task }: TaskCardProps) {
  const { toggleTask, removeTask } = useTaskStore();

  return (
    <Card className="mb-2">
      <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id={`checkbox-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => toggleTask(task.id)}
          />
          <label
            htmlFor={`checkbox-${task.id}`}
            className={`text-sm ${
              task.completed ? "line-through text-gray-400" : "text-gray-900"
            }`}
          >
            {task.title}
          </label>
        </div>

        <div className="flex flex-col md:items-end items-start gap-3">
          {task.priority && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority === "high"
                ? "Haute"
                : task.priority === "medium"
                ? "Moyenne"
                : "Basse"}
            </span>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <CalendarDays className="w-4 h-4" />
              <span>
                Échéance :{" "}
                {new Date(task.dueDate).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          {/* Bouton Supprimer */}
          <button
            onClick={() => {
              removeTask(task.id);
              toast.success("Tâche supprimée avec succès");
            }}
            className="text-xs text-red-500 hover:underline"
          >
            Supprimer
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

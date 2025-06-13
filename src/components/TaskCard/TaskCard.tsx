import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

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
  onToggle?: (id: string) => void;
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

export default function TaskCard({ task, onToggle }: TaskCardProps) {
  return (
    <Card className="mb-2">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id={`checkbox-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggle?.(task.id)}
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

        <div className="flex items-center gap-3">
          {task.dueDate && (
            <span className="text-xs text-gray-500">
              {new Date(task.dueDate).toLocaleDateString("fr-FR")}
            </span>
          )}
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
        </div>
      </CardContent>
    </Card>
  );
}

import { useTaskStore } from "@/store/useTaskStore";
import { cn } from "@/lib/utils";

export function ListView() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="space-y-2">
      {tasks.length === 0 && <p className="text-muted-foreground">Aucune tâche à afficher.</p>}

      {tasks.map((task) => (
        <div
          key={task.id}
          className={cn(
            "border rounded-lg p-4 flex justify-between items-center",
            task.completed ? "bg-muted" : "bg-white"
          )}
        >
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-muted-foreground">
              Échéance : {task.dueDate} | Priorité : {task.priority}
            </p>
          </div>
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded",
              task.status === "todo" && "bg-gray-200",
              task.status === "in-progress" && "bg-yellow-200",
              task.status === "done" && "bg-green-200"
            )}
          >
            {task.status}
          </span>
        </div>
      ))}
    </div>
  );
}
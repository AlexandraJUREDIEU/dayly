import { TaskColumn } from "../TaskColumn.tsx/TaskColumn";
import type { Task } from "@/store/useTaskStore";

export function KanbanBoard({ tasks }: { tasks: Task[] }) {
  const columns: { title: string; status: "todo" | "in-progress" | "done" }[] =
    [
      { title: "À faire", status: "todo" },
      { title: "En cours", status: "in-progress" },
      { title: "Terminées", status: "done" },
    ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {columns.map(({ title, status }) => (
        <TaskColumn
          key={status}
          title={title}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
        />
      ))}
    </div>
  );
}

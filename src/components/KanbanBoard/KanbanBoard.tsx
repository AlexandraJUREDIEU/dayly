import type { Task } from "../TaskCard/TaskCard";
import { TaskColumn } from "../TaskColumn.tsx/TaskColumn";



type KanbanBoardProps = {
  tasks: Task[];
  onToggle?: (id: string) => void;
};

export function KanbanBoard({ tasks, onToggle }: KanbanBoardProps) {
  const columns: { title: string; status: Task["status"] }[] = [
    { title: "À faire", status: "todo" },
    { title: "En cours", status: "in-progress" },
    { title: "Terminées", status: "done" },
  ];

  // DEBUG: Log the tasks to console
  console.log("Tasks in KanbanBoard:", tasks);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map(({ title, status }) => (
        <TaskColumn
          key={status}
          title={title}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
import type { Task } from "../TaskCard/TaskCard";
import { TaskColumn } from "../TaskColumn.tsx/TaskColumn";



type KanbanBoardProps = {
  tasks: Task[];
  onToggle?: (id: string) => void;
};

export function KanbanBoard({ tasks, onToggle }: KanbanBoardProps) {
  const todo = tasks.filter((task) => task.status === "todo");
  const inProgress = tasks.filter((task) => task.status === "in-progress");
  const done = tasks.filter((task) => task.status === "done");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <TaskColumn title="À faire" tasks={todo} onToggle={onToggle} />
      <TaskColumn title="En cours" tasks={inProgress} onToggle={onToggle} />
      <TaskColumn title="Fait" tasks={done} onToggle={onToggle} />
    </div>
  );
}
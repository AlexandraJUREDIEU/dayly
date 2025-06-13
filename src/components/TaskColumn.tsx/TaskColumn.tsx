import type { Task } from "../TaskCard/TaskCard";
import { TaskList } from "../TaskList/TaskList";

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  onToggle?: (taskId: string) => void;
};

export function TaskColumn({ title, tasks, onToggle }: TaskColumnProps) {
  return (
    <div className="bg-white rounded-xl shadow-md  p-2 w-full max-w-sm">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <TaskList tasks={tasks} onToggle={onToggle} />
    </div>
  );
}
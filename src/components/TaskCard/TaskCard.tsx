export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
};

type TaskCardProps = {
  task: Task;
  onToggle?: (id: string) => void;
};

export default function TaskCard({ task, onToggle }: TaskCardProps) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl border shadow-sm transition ${
        task.completed ? "bg-green-100 line-through text-gray-500" : "bg-white"
      }`}
    >
      <span>{task.title}</span>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle?.(task.id)}
        className="h-4 w-4 accent-green-600"
      />
    </div>
  );
}

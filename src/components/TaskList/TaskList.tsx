import TaskCard, { type Task } from "../TaskCard/TaskCard";


type TaskListProps = {
  tasks: Task[];
  onToggle?: (taskId: string) => void;
};

export function TaskList({ tasks, onToggle }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-gray-500 italic">Aucune tâche pour le moment.</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} onToggle={onToggle} />
        </li>
      ))}
    </ul>
  );
}
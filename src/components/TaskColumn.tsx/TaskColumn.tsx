import type { Task } from "@/store/useTaskStore";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "@/components/TaskCard/TaskCard";

type TaskColumnProps = {
  title: string;
  status: Task["status"];
  tasks: Task[];
};

export function TaskColumn({ title, status, tasks }: TaskColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  const bgColor = {
    todo: "bg-slate-50",
    "in-progress": "bg-indigo-50",
    done: "bg-emerald-50",
  }[status];

  const textColor = {
    todo: "text-slate-700",
    "in-progress": "text-indigo-700",
    done: "text-emerald-700",
  }[status];

  return (
    <div 
    ref={setNodeRef}
    className={`rounded-lg p-4 shadow-sm ${bgColor} flex flex-col gap-2 ${isOver ? "ring-2 ring-blue-500" : ""}`}>
      <h2 className={`text-md font-semibold mb-2 uppercase tracking-wide ${textColor}`}>
        {title}
      </h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
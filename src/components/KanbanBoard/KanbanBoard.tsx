import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { TaskColumn } from "../TaskColumn.tsx/TaskColumn";
import { useTaskStore } from "@/store/useTaskStore";
import type { Task, TaskStatus } from "@/store/useTaskStore";

const isTaskStatus = (value: any): value is TaskStatus => {
return ["todo", "in-progress", "done"].includes(value);
};
export function KanbanBoard({ tasks: tasksProp }: { tasks?: Task[] }) {
  const { tasks: storeTasks, updateTask } = useTaskStore();
  const tasks = tasksProp ?? storeTasks;
  
  const columns: { title: string; status: "todo" | "in-progress" | "done" }[] =
    [
      { title: "À faire", status: "todo" },
      { title: "En cours", status: "in-progress" },
      { title: "Terminées", status: "done" },
    ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const taskId = String(active.id);
    const newStatusRaw = over.id;
      if (!isTaskStatus(newStatusRaw)) return;
    const newStatus: TaskStatus = newStatusRaw;
    
    updateTask(taskId, { status: newStatus });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {columns.map(({ title, status }) => (
          <TaskColumn
            key={status}
            title={title}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
          />
        ))}
      </DndContext>
    </div>
  );
}

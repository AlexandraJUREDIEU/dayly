import { useState } from "react";
import type { Task } from "../TaskCard/TaskCard";
import { TaskColumn } from "../TaskColumn.tsx/TaskColumn";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import TaskCard from "../TaskCard/TaskCard";

type KanbanBoardProps = {
  tasks: Task[];
  onToggle?: (id: string) => void;
  onMove: (id: string, newStatus: Task["status"]) => void;
};

export function KanbanBoard({ tasks, onToggle, onMove }: KanbanBoardProps) {
  
  const [activeId, setActiveId] = useState<string | null>(null);
  const columns: { title: string; status: Task["status"] }[] = [
    { title: "À faire", status: "todo" },
    { title: "En cours", status: "in-progress" },
    { title: "Terminées", status: "done" },
  ];

  const handleDragStart = (e: DragStartEvent) => {
    const taskId = e.active.id.toString();
    setActiveId(taskId);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    const taskId = active.id.toString();
    const newStatus = over.id.toString() as Task["status"];

    onMove(taskId, newStatus);
    setActiveId(null);
  };
  const activeTask = tasks.find((task) => task.id === activeId);

  // DEBUG: Log the tasks to console
  console.log("Tasks in KanbanBoard:", tasks);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <DragOverlay>
  {activeTask ? (
    <TaskCard task={activeTask} isDragging={false} />
  ) : null}
</DragOverlay>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {columns.map(({ title, status }) => (
          <TaskColumn
            key={status}
            title={title}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
            onToggle={onToggle}
            activeId={activeId}
          />
        ))}
      </div>
    </DndContext>
  );
}

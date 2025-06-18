import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { TaskColumn } from "../TaskColumn.tsx/TaskColumn";
import { useTaskStore } from "@/store/useTaskStore";
import type { Task, TaskStatus } from "@/store/useTaskStore";

const isTaskStatus = (value: unknown): value is TaskStatus => {
return typeof value === "string" && ["todo", "in-progress", "done"].includes(value);
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
  const overId = String(over.id);

  // Trouver la tâche déplacée
  const movedTask = tasks.find((t) => t.id === taskId);
  if (!movedTask) return;

  // Si on droppe sur une colonne (pas sur une carte)
  const isColumnDrop = ["todo", "in-progress", "done"].includes(overId);

  // Filtrer les tâches de la colonne cible
  const targetStatus = isColumnDrop ? overId : tasks.find((t) => t.id === overId)?.status;
  if (!isTaskStatus(targetStatus)) return;

  // Liste des tâches dans la colonne cible, triées par order
  const columnTasks = tasks
    .filter((t) => t.status === targetStatus && t.id !== taskId)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  let newOrder = 0;
  if (isColumnDrop) {
    // Drop en bas de colonne
    newOrder = columnTasks.length > 0 ? (columnTasks[columnTasks.length - 1].order ?? columnTasks.length - 1) + 1 : 0;
  } else {
    // Drop sur une carte : placer avant la carte cible
    const overIndex = columnTasks.findIndex((t) => t.id === overId);
    newOrder = overIndex === -1 ? 0 : columnTasks[overIndex].order ?? overIndex;
    // Décale les autres tâches si besoin
    const updates = columnTasks
      .filter((t) => (t.order ?? 0) >= newOrder)
      .map((t) => ({ id: t.id, changes: { order: (t.order ?? 0) + 1 } }));
    updates.forEach(({ id, changes }) => updateTask(id, changes));
  }

  updateTask(taskId, { status: targetStatus, order: newOrder });
};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {columns.map(({ title, status }) => (
          <TaskColumn
            key={status}
            title={title}
            status={status}
            tasks={tasks
              .filter((t) => t.status === status)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))}
          />
        ))}
      </DndContext>
    </div>
  );
}

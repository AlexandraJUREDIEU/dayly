import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash } from "lucide-react";
import { useTaskStore, type Task } from "@/store/useTaskStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Composant pour afficher une tâche sortable
function SortableTask({ task }: { task: Task }) {
  const { removeTask } = useTaskStore();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: "default",
      }}
      className={cn(
        "border rounded-lg p-4 flex justify-between items-center gap-2",
        task.completed ? "bg-muted" : "bg-white"
      )}
    >
      {/* Drag handle */}
      <span
        {...listeners}
        {...attributes}
        className="mr-2 cursor-grab text-gray-400 hover:text-gray-600"
        tabIndex={0}
        aria-label="Déplacer"
      >
        <GripVertical size={20} />
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{task.title}</h3>
        <p className="text-sm text-muted-foreground truncate">
          Échéance : {task.dueDate} | Priorité : {task.priority}
        </p>
      </div>
      <span
        className={cn(
          "text-xs font-medium px-2 py-1 rounded",
          task.status === "todo" && "bg-gray-200",
          task.status === "in-progress" && "bg-yellow-200",
          task.status === "done" && "bg-green-200"
        )}
      >
        {task.status}
      </span>
      {/* Bouton modifier */}
      <button
        className="ml-2 p-1 rounded hover:bg-gray-100"
        title="Modifier"
        // onClick={() => ...}
      >
        <Pencil size={18} />
      </button>
      {/* Bouton supprimer */}
      <button
        className="ml-1 p-1 rounded hover:bg-red-100 text-red-500"
        title="Supprimer"
        onClick={() => {
          removeTask(task.id);
          toast.success("Tâche supprimée avec succès")
        }}
        aria-label={`Supprimer la tâche ${task.title}`}
      >
        <Trash size={18} />
      </button>
    </div>
  );
}

export function ListView({ tasks }: { tasks: Task[] }) {
  const setTasks = useTaskStore((s) => s.setTasks);
    // Trie les tâches par ordre
  const sortedTasks = tasks.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortedTasks.findIndex((t) => t.id === active.id);
    const newIndex = sortedTasks.findIndex((t) => t.id === over.id);
    const newTasks = arrayMove(sortedTasks, oldIndex, newIndex)
      .map((task, idx) => ({ ...task, order: idx + 1 }));
    setTasks(newTasks);
  }

  return (
    <div className="space-y-2">
      {tasks.length === 0 && (
        <p className="text-muted-foreground">Aucune tâche à afficher.</p>
      )}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={sortedTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedTasks.map((task) => (
            <SortableTask key={task.id} task={task} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

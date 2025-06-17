import { useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { KanbanBoard } from "@/components/KanbanBoard/KanbanBoard";
import type { Task } from "@/components/TaskCard/TaskCard";
import { TaskModal } from "@/components/TaskModal";
import { Button } from "@/components/ui/button";
import { ViewSwitcher } from "@/components/ViewSwitcher/ViewSwitcher";
import { ListView } from "@/components/ListView/ListView";
import { CalendarView } from "@/components/CalendarView/CalendarView";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const addTask = useTaskStore((state) => state.addTask);
  const allTasks = useTaskStore((state) => state.tasks);
  const viewMode = useTaskStore((state) => state.viewMode);
  const [createOpen, setCreateOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  const filteredTasks = allTasks.filter((task) => {
    const matchStatus = !statusFilter || task.status === statusFilter;
    const matchPriority = !priorityFilter || task.priority === priorityFilter;
    return matchStatus && matchPriority;
  });

  const handleAddTask = (task: Task) => {
    addTask(task);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between">
        <h1 className="md:text-2xl font-bold mb-6">Mon tableau de tâches</h1>

        {/* Bouton pour ouvrir la modale de création */}
        <Button variant="outline" onClick={() => setCreateOpen(true)}>
          <span className="hidden sm:inline">Nouvelle tâche</span>
          <span className="inline sm:hidden">+</span>
        </Button>
      </div>
      {/* Commutateur de vue + Filtres */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <ViewSwitcher />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {/* Status */}
          <div className="w-40">
            <Select
              value={statusFilter || ""}
              onValueChange={(value) =>
                setStatusFilter(value === "all" ? null : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="todo">À faire</SelectItem>
                <SelectItem value="in-progress">En cours</SelectItem>
                <SelectItem value="done">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="w-40">
            <Select
              value={priorityFilter || ""}
              onValueChange={(value) =>
                setPriorityFilter(value === "all" ? null : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Toutes les priorités" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="high">Élevée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Autres filtres peuvent être ajoutés ici */}
        </div>
      </div>
      {viewMode === "kanban" && <KanbanBoard tasks={filteredTasks} />}
      {viewMode === "list" && <ListView tasks={filteredTasks} />}
      {viewMode === "calendar" && <CalendarView tasks={filteredTasks} />}
      {/* Affichage des tâches filtrées */}
      {/* Modale de création de tâche */}
      <TaskModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={handleAddTask}
      />
    </main>
  );
}

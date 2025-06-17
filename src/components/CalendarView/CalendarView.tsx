import { useState } from "react";
import { CustomCalendar } from "@/components/CalendarView/CustomCalendar";
import type { Task } from "@/store/useTaskStore";
import { format, isSameDay } from "date-fns";

export function CalendarView({ tasks }: { tasks: Task[] }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const tasksForSelectedDate = tasks.filter(
    (task) =>
      task.dueDate !== undefined &&
      isSameDay(new Date(task.dueDate), selectedDate)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <CustomCalendar
          tasks={tasks}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Tâches du {format(selectedDate, "dd/MM/yyyy")}
        </h3>

        {tasksForSelectedDate.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Aucune tâche à cette date.
          </p>
        ) : (
          tasksForSelectedDate.map((task) => (
            <div
              key={task.id}
              className={`p-3 rounded-lg shadow-sm flex items-center justify-between ${
                task.priority === "high"
                  ? "bg-red-200 text-red-800"
                  : task.priority === "medium"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              <div>
                <p className="font-semibold text-sm">{task.title}</p>
                <p className="text-xs text-muted-foreground">
                  Statut : {task.status} | Priorité : {task.priority}
                </p>
              </div>
              <span className="text-xs capitalize">{task.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

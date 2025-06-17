import Calendar, {type CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTaskStore } from "@/store/useTaskStore";
import { useState } from "react";
import { format } from "date-fns";

type CalendarValue = CalendarProps["value"];

export function CalendarView() {
  const tasks = useTaskStore((state) => state.tasks);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (value: CalendarValue) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  const tasksForDate = tasks.filter((task) => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return format(taskDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">
          Tâches du {format(selectedDate, "dd/MM/yyyy")} :
        </h3>

        {tasksForDate.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucune tâche à cette date.</p>
        ) : (
          tasksForDate.map((task) => (
            <div key={task.id} className="border p-3 rounded shadow-sm">
              <div className="font-medium">{task.title}</div>
              <div className="text-sm text-muted-foreground">
                Statut : {task.status} | Priorité : {task.priority}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import type { Task } from "@/store/useTaskStore";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns";

type CustomCalendarProps = {
  tasks: Task[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
};

export function CustomCalendar({ tasks, selectedDate, onSelectDate }: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // lundi
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const thisDay = day;
      const dayTasks = tasks.filter(
        (task) => task.dueDate && isSameDay(new Date(task.dueDate), thisDay)
      );

      days.push(
        <div
          key={thisDay.toISOString()}
          className={`p-2 border h-24 relative rounded-md cursor-pointer transition
            ${isSameMonth(thisDay, monthStart) ? "bg-white" : "bg-muted"}
            ${isSameDay(thisDay, selectedDate) ? "border-blue-500 ring-2 ring-blue-500" : ""}
          `}
          onClick={() => onSelectDate(thisDay)}
        >
          <div className="text-sm font-medium">{format(thisDay, dateFormat)}</div>

          <div className="space-y-0.5 mt-1">
            {dayTasks.slice(0, 2).map((task) => (
              <div
                key={task.id}
                className={`text-[10px] truncate px-1 rounded ${
                  task.priority === "high"
                    ? "bg-red-200 text-red-800"
                    : task.priority === "medium"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {task.title}
              </div>
            ))}
            {dayTasks.length > 2 && (
              <div className="text-[10px] text-gray-500">+{dayTasks.length - 2} autre(s)</div>
            )}
          </div>
        </div>
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div key={day.toISOString()} className="grid grid-cols-7 gap-1">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="p-4 border rounded-lg space-y-2">
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>←</button>
        <h2 className="font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>→</button>
      </div>

      <div className="grid grid-cols-7 text-xs font-semibold text-center text-muted-foreground">
        <div>Lun</div>
        <div>Mar</div>
        <div>Mer</div>
        <div>Jeu</div>
        <div>Ven</div>
        <div>Sam</div>
        <div>Dim</div>
      </div>

      <div className="space-y-1">{rows}</div>
    </div>
  );
}
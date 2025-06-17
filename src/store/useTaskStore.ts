import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type ViewMode = 'list' | 'calendar' | 'kanban';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  status: TaskStatus;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      viewMode: 'kanban',
      setViewMode: (mode) => set({ viewMode: mode }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (updatedTask : Task) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
          ),
        })),
      removeTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      setTasks: (tasks) => set({ tasks }),
    }),
    {
      name: 'dayly-tasks',
    }
  )
);
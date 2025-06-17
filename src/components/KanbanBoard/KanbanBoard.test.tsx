import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { Task } from "@/store/useTaskStore";
import { KanbanBoard } from "./KanbanBoard";

const mockTasks: Task[] = [
  { id: "1", title: "Tâche A", completed: false, status: "todo" },
  { id: "2", title: "Tâche B", completed: false, status: "in-progress" },
  { id: "3", title: "Tâche C", completed: true, status: "done" },
];

describe("<KanbanBoard />", () => {
  it("affiche les trois colonnes", () => {
    render(<KanbanBoard tasks={mockTasks} />);
    expect(screen.getByText("À faire")).toBeInTheDocument();
    expect(screen.getByText("En cours")).toBeInTheDocument();
    expect(screen.getByText("Fait")).toBeInTheDocument();
  });

  it("affiche les tâches dans les bonnes colonnes", () => {
    render(<KanbanBoard tasks={mockTasks} />);
    expect(screen.getByText("Tâche A")).toBeInTheDocument();
    expect(screen.getByText("Tâche B")).toBeInTheDocument();
    expect(screen.getByText("Tâche C")).toBeInTheDocument();
  });
});
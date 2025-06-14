import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from 'vitest';
import { TaskColumn } from "./TaskColumn";
import type { Task } from "../TaskCard/TaskCard";


describe("<TaskColumn />", () => {
  const tasks: Task[] = [
  { id: "1", title: "Tâche 1", completed: false, status: "todo" },
  { id: "2", title: "Tâche 2", completed: true, status: "in-progress" },
  ];

  it("affiche le titre de la colonne", () => {
    render(<TaskColumn title="À faire" tasks={tasks} />);
    expect(screen.getByText("À faire")).toBeInTheDocument();
  });

  it("affiche les tâches fournies", () => {
    render(<TaskColumn title="Test" tasks={tasks} />);
    expect(screen.getByText("Tâche 1")).toBeInTheDocument();
    expect(screen.getByText("Tâche 2")).toBeInTheDocument();
  });

  it("appelle onToggle quand on coche une tâche", () => {
    const onToggle = vi.fn();
    render(<TaskColumn title="Test" tasks={tasks} onToggle={onToggle} />);
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    expect(onToggle).toHaveBeenCalledWith("1");
  });
});
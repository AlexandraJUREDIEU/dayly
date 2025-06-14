import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from 'vitest';
import { TaskList } from "./TaskList";
import type { Task } from "../TaskCard/TaskCard";

describe("<TaskList />", () => {
  const tasks: Task[] = [
    { id: "1", title: "Tâche 1", completed: false },
    { id: "2", title: "Tâche 2", completed: true },
  ];

  it("affiche toutes les tâches", () => {
    render(<TaskList tasks={tasks} />);
    expect(screen.getByText("Tâche 1")).toBeInTheDocument();
    expect(screen.getByText("Tâche 2")).toBeInTheDocument();
  });

  it("appelle onToggle quand une case est cochée", () => {
    const onToggle = vi.fn();
    render(<TaskList tasks={tasks} onToggle={onToggle} />);
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    expect(onToggle).toHaveBeenCalledWith("1");
  });

  it("affiche un message quand la liste est vide", () => {
    render(<TaskList tasks={[]} />);
    expect(screen.getByText(/aucune tâche/i)).toBeInTheDocument();
  });
});
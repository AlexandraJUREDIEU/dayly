import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AddTaskBar } from "./AddTaskBar";

describe("<AddTaskBar />", () => {
  it("appelle onAddTask avec les bonnes données", () => {
    const onAddTask = vi.fn();
    render(<AddTaskBar onAddTask={onAddTask} />);

    const input = screen.getByPlaceholderText(/ajouter une tâche/i);
    fireEvent.change(input, { target: { value: "Nouvelle tâche" } });

    const button = screen.getByText("Ajouter");
    fireEvent.click(button);

    expect(onAddTask).toHaveBeenCalled();
    expect(onAddTask.mock.calls[0][0]).toMatchObject({
      title: "Nouvelle tâche",
      completed: false,
      status: "todo",
    });
  });
});
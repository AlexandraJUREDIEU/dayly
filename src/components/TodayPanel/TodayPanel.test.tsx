import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import TodayPanel from "./TodayPanel";

describe("<TodayPanel />", () => {
  it("ajoute une tâche et l'affiche", () => {
    render(<TodayPanel />);
    const input = screen.getByPlaceholderText(/ajouter une tâche/i);
    fireEvent.change(input, { target: { value: "Apprendre React" } });

    const button = screen.getByText(/ajouter/i);
    fireEvent.click(button);

    expect(screen.getByText("Apprendre React")).toBeInTheDocument();
  });

  it("permet de cocher une tâche comme complétée", () => {
    render(<TodayPanel />);
    const input = screen.getByPlaceholderText(/ajouter une tâche/i);
    fireEvent.change(input, { target: { value: "Faire les courses" } });

    fireEvent.click(screen.getByText(/ajouter/i));
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
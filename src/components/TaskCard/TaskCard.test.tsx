import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from './TaskCard';
import type { Task } from './TaskCard';
import { describe, it, expect, vi } from 'vitest';

describe('TaskCard', () => {
  const task: Task = {
    id: '1',
    title: 'Faire le test',
    completed: false,
  };

  it("affiche le titre de la tâche", () => {
    render(<TaskCard task={task} />);
    expect(screen.getByText("Faire le test")).toBeInTheDocument();
  });

  it("appelle onToggle quand on clique sur la checkbox", () => {
    const handleToggle = vi.fn();
    render(<TaskCard task={task} onToggle={handleToggle} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleToggle).toHaveBeenCalledWith('1');
  });
});
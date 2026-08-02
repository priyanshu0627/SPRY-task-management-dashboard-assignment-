import { useMemo } from 'react';
import { TaskBoard } from '../components/TaskBoard';
import { filterAndSortTasks } from '../lib/tasks';
import { TaskStatus, type SortDirection, type Task } from '../types/task';

interface CompletedTasksPageProps {
  tasks: Task[];
  sortDirection: SortDirection;
  onSortDirectionToggle: () => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function CompletedTasksPage({
  tasks,
  sortDirection,
  onSortDirectionToggle,
  onEdit,
  onDelete,
}: CompletedTasksPageProps) {
  const completedTasks = useMemo(
    () => filterAndSortTasks(tasks, { status: TaskStatus.Completed, sortDirection }),
    [tasks, sortDirection],
  );

  return (
    <TaskBoard
      tasks={completedTasks}
      totalCount={tasks.length}
      sortDirection={sortDirection}
      onSortDirectionToggle={onSortDirectionToggle}
      emptyTitle="Nothing completed yet"
      emptyDescription="Tasks you mark as completed will show up here."
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

import { TaskStatus, type SortDirection, type StatusFilter, type Task } from '../types/task';

export type StatusCounts = Record<TaskStatus, number> & { total: number };

export function countByStatus(tasks: Task[]): StatusCounts {
  return {
    total: tasks.length,
    [TaskStatus.Pending]: tasks.filter((task) => task.status === TaskStatus.Pending).length,
    [TaskStatus.InProgress]: tasks.filter((task) => task.status === TaskStatus.InProgress).length,
    [TaskStatus.Completed]: tasks.filter((task) => task.status === TaskStatus.Completed).length,
  };
}

interface FilterAndSortOptions {
  status: StatusFilter;
  sortDirection: SortDirection;
}

export function filterAndSortTasks(tasks: Task[], options: FilterAndSortOptions): Task[] {
  const filtered =
    options.status === 'all' ? tasks : tasks.filter((task) => task.status === options.status);

  return [...filtered].sort((a, b) =>
    options.sortDirection === 'asc'
      ? a.dueDate.localeCompare(b.dueDate)
      : b.dueDate.localeCompare(a.dueDate),
  );
}

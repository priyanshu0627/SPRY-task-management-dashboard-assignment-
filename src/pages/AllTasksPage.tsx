import { useMemo } from 'react';
import { TaskBoard } from '../components/TaskBoard';
import { filterAndSortTasks } from '../lib/tasks';
import type { SortDirection, StatusFilter, Task } from '../types/task';

interface AllTasksPageProps {
  tasks: Task[];
  statusFilter: StatusFilter;
  sortDirection: SortDirection;
  onStatusChange: (status: StatusFilter) => void;
  onSortDirectionToggle: () => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function AllTasksPage({
  tasks,
  statusFilter,
  sortDirection,
  onStatusChange,
  onSortDirectionToggle,
  onEdit,
  onDelete,
}: AllTasksPageProps) {
  const visibleTasks = useMemo(
    () => filterAndSortTasks(tasks, { status: statusFilter, sortDirection }),
    [tasks, statusFilter, sortDirection],
  );

  const isFiltered = statusFilter !== 'all';

  return (
    <TaskBoard
      tasks={visibleTasks}
      totalCount={tasks.length}
      sortDirection={sortDirection}
      onSortDirectionToggle={onSortDirectionToggle}
      statusFilter={statusFilter}
      onStatusChange={onStatusChange}
      emptyTitle={isFiltered ? 'No matching tasks' : 'No tasks yet'}
      emptyDescription={
        isFiltered ? 'Try a different status filter.' : 'Tasks you create will show up here.'
      }
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

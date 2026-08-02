import { TaskFilters } from './TaskFilters';
import { TaskList } from './TaskList';
import type { SortDirection, StatusFilter, Task } from '../types/task';

interface TaskBoardProps {
  tasks: Task[];
  totalCount: number;
  sortDirection: SortDirection;
  onSortDirectionToggle: () => void;
  statusFilter?: StatusFilter;
  onStatusChange?: (status: StatusFilter) => void;
  emptyTitle: string;
  emptyDescription: string;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskBoard({
  tasks,
  totalCount,
  sortDirection,
  onSortDirectionToggle,
  statusFilter,
  onStatusChange,
  emptyTitle,
  emptyDescription,
  onEdit,
  onDelete,
}: TaskBoardProps) {
  return (
    <div className="space-y-6">
      <TaskFilters
        status={statusFilter}
        onStatusChange={onStatusChange}
        sortDirection={sortDirection}
        onSortDirectionToggle={onSortDirectionToggle}
        visibleCount={tasks.length}
        totalCount={totalCount}
      />

      <TaskList
        tasks={tasks}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

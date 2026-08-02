import { TaskFilters } from './TaskFilters';
import { TaskList } from './TaskList';
import type { Task } from '../types/task';

interface TaskBoardProps {
  tasks: Task[];
  totalCount: number;
  showStatusFilter?: boolean;
  emptyTitle: string;
  emptyDescription: string;
}

export function TaskBoard({
  tasks,
  totalCount,
  showStatusFilter,
  emptyTitle,
  emptyDescription,
}: TaskBoardProps) {
  return (
    <div className="space-y-6">
      <TaskFilters
        showStatusFilter={showStatusFilter}
        visibleCount={tasks.length}
        totalCount={totalCount}
      />
      <TaskList tasks={tasks} emptyTitle={emptyTitle} emptyDescription={emptyDescription} />
    </div>
  );
}

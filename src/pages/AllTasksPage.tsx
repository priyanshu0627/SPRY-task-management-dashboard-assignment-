import { useMemo } from 'react';
import { TaskBoard } from '../components/TaskBoard';
import { useTaskFilters } from '../context/taskFilters';
import { useTasks } from '../context/tasks';
import { filterAndSortTasks } from '../lib/tasks';

export function AllTasksPage() {
  const { tasks } = useTasks();
  const { status, sortDirection } = useTaskFilters();

  const visibleTasks = useMemo(
    () => filterAndSortTasks(tasks, { status, sortDirection }),
    [tasks, status, sortDirection],
  );

  const isFiltered = status !== 'all';

  return (
    <TaskBoard
      tasks={visibleTasks}
      totalCount={tasks.length}
      showStatusFilter
      emptyTitle={isFiltered ? 'No matching tasks' : 'No tasks yet'}
      emptyDescription={
        isFiltered ? 'Try a different status filter.' : 'Tasks you create will show up here.'
      }
    />
  );
}

import { useMemo } from 'react';
import { TaskBoard } from '../components/TaskBoard';
import { useTaskFilters } from '../context/taskFilters';
import { useTasks } from '../context/tasks';
import { filterAndSortTasks } from '../lib/tasks';
import { TaskStatus } from '../types/task';

export function CompletedTasksPage() {
  const { tasks } = useTasks();
  const { sortDirection } = useTaskFilters();

  const completedTasks = useMemo(
    () => filterAndSortTasks(tasks, { status: TaskStatus.Completed, sortDirection }),
    [tasks, sortDirection],
  );

  return (
    <TaskBoard
      tasks={completedTasks}
      emptyTitle="Nothing completed yet"
      emptyDescription="Tasks you mark as completed will show up here."
    />
  );
}

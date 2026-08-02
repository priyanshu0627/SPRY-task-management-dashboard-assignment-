import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { SortDirection, StatusFilter } from '../types/task';
import { TaskFiltersContext, type TaskFiltersValue } from './taskFilters';

export function TaskFiltersProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<StatusFilter>('all');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const toggleSortDirection = useCallback(
    () => setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc')),
    [],
  );

  const value = useMemo<TaskFiltersValue>(
    () => ({ status, sortDirection, setStatus, toggleSortDirection }),
    [status, sortDirection, toggleSortDirection],
  );

  return <TaskFiltersContext.Provider value={value}>{children}</TaskFiltersContext.Provider>;
}

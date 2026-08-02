import { createContext, useContext } from 'react';
import type { SortDirection, StatusFilter } from '../types/task';

export interface TaskFiltersValue {
  status: StatusFilter;
  sortDirection: SortDirection;
  setStatus: (status: StatusFilter) => void;
  toggleSortDirection: () => void;
}

export const TaskFiltersContext = createContext<TaskFiltersValue | null>(null);

export function useTaskFilters(): TaskFiltersValue {
  const context = useContext(TaskFiltersContext);
  if (context === null) {
    throw new Error('useTaskFilters must be used inside a TaskFiltersProvider');
  }
  return context;
}

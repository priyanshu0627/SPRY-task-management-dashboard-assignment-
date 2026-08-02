import {
  STATUS_LABELS,
  TASK_STATUSES,
  type SortDirection,
  type StatusFilter,
} from '../types/task';
import { Button } from './ui/Button';

interface TaskFiltersProps {
  status: StatusFilter;
  sortDirection: SortDirection;
  onStatusChange: (status: StatusFilter) => void;
  onSortDirectionToggle: () => void;
  visibleCount: number;
  totalCount: number;
}

const selectClasses =
  'rounded-lg px-3 py-2 text-sm text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-slate-900';

export function TaskFilters({
  status,
  sortDirection,
  onStatusChange,
  onSortDirectionToggle,
  visibleCount,
  totalCount,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-2">
        <label htmlFor="status-filter" className="text-sm font-medium text-slate-700">
          Status
        </label>
        <select
          id="status-filter"
          value={status}
          onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
          className={selectClasses}
        >
          <option value="all">All</option>
          {TASK_STATUSES.map((taskStatus) => (
            <option key={taskStatus} value={taskStatus}>
              {STATUS_LABELS[taskStatus]}
            </option>
          ))}
        </select>
      </div>

      <Button
        variant="secondary"
        onClick={onSortDirectionToggle}
        aria-label={`Sort by due date, currently ${sortDirection === 'asc' ? 'earliest first' : 'latest first'}`}
      >
        Due date {sortDirection === 'asc' ? '↑' : '↓'}
      </Button>

      <p className="ml-auto text-sm text-slate-500" aria-live="polite">
        Showing {visibleCount} of {totalCount}
      </p>
    </div>
  );
}

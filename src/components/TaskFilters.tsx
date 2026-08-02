import { useTaskFilters } from '../context/taskFilters';
import { STATUS_LABELS, TASK_STATUSES, type StatusFilter } from '../types/task';
import { Button } from './ui/Button';

interface TaskFiltersProps {
  showStatusFilter?: boolean;
  visibleCount: number;
  totalCount?: number;
}

const selectClasses =
  'rounded-lg px-3 py-2 text-sm text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-slate-900';

export function TaskFilters({ showStatusFilter, visibleCount, totalCount }: TaskFiltersProps) {
  const { status, sortDirection, setStatus, toggleSortDirection } = useTaskFilters();

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
      {showStatusFilter && (
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            id="status-filter"
            value={status}
            onChange={(event) => setStatus(event.target.value as StatusFilter)}
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
      )}

      <Button
        variant="secondary"
        onClick={toggleSortDirection}
        aria-label={`Sort by due date, currently ${sortDirection === 'asc' ? 'earliest first' : 'latest first'}`}
      >
        Due date {sortDirection === 'asc' ? '↑' : '↓'}
      </Button>

      <p className="w-full text-sm text-slate-500 sm:ml-auto sm:w-auto" aria-live="polite">
        {totalCount === undefined
          ? `${visibleCount} ${visibleCount === 1 ? 'task' : 'tasks'}`
          : `Showing ${visibleCount} of ${totalCount}`}
      </p>
    </div>
  );
}

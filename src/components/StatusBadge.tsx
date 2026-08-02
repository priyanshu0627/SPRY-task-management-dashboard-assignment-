import { STATUS_LABELS, TaskStatus } from '../types/task';

const STATUS_STYLES: Record<TaskStatus, string> = {
  [TaskStatus.Pending]: 'bg-slate-100 text-slate-700 ring-slate-200',
  [TaskStatus.InProgress]: 'bg-blue-50 text-blue-700 ring-blue-200',
  [TaskStatus.Completed]: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
};

interface StatusBadgeProps {
  status: TaskStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

import { STATUS_LABELS, TASK_STATUSES } from '../types/task';
import type { StatusCounts } from '../lib/tasks';

interface TaskSummaryProps {
  counts: StatusCounts;
}

export function TaskSummary({ counts }: TaskSummaryProps) {
  const cards = [
    { label: 'Total', value: counts.total },
    ...TASK_STATUSES.map((status) => ({ label: STATUS_LABELS[status], value: counts[status] })),
  ];

  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4">
          <dt className="text-xs font-medium text-slate-500">{card.label}</dt>
          <dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">{card.value}</dd>
        </div>
      ))}
    </dl>
  );
}

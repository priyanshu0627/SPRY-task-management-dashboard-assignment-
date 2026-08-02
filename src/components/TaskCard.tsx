import { formatDueDate, isOverdue } from '../lib/date';
import { TaskStatus, type Task } from '../types/task';
import { StatusBadge } from './StatusBadge';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  // A completed task is not "late" in any useful sense.
  const overdue = task.status !== TaskStatus.Completed && isOverdue(task.dueDate);

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900">{task.title}</h3>
        <StatusBadge status={task.status} />
      </div>

      {task.description && (
        <p className="mt-2 line-clamp-3 text-sm text-slate-600">{task.description}</p>
      )}

      <div className="mt-auto pt-4">
        <p className={`text-xs font-medium ${overdue ? 'text-red-600' : 'text-slate-500'}`}>
          Due {formatDueDate(task.dueDate)}
          {overdue && ' · Overdue'}
        </p>
      </div>
    </article>
  );
}

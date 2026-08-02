import { useTasks } from '../context/tasks';
import { formatDueDate, isOverdue } from '../lib/date';
import { TaskStatus, type Task } from '../types/task';
import { StatusBadge } from './StatusBadge';
import { Button } from './ui/Button';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { openEditForm, requestDelete } = useTasks();
  const overdue = task.status !== TaskStatus.Completed && isOverdue(task.dueDate);

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="break-words text-sm font-semibold text-slate-900">{task.title}</h3>
        <StatusBadge status={task.status} />
      </div>

      {task.description && (
        <p className="mt-2 line-clamp-3 break-words text-sm text-slate-600">{task.description}</p>
      )}

      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
        <p className={`text-xs font-medium ${overdue ? 'text-red-600' : 'text-slate-500'}`}>
          Due {formatDueDate(task.dueDate)}
          {overdue && ' · Overdue'}
        </p>

        <div className="flex shrink-0 gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => openEditForm(task)}
            aria-label={`Edit ${task.title}`}
          >
            Edit
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => requestDelete(task)}
            aria-label={`Delete ${task.title}`}
            className="text-red-600 ring-red-200 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}

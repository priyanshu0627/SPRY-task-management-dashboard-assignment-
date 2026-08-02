import { useForm, type RegisterOptions } from 'react-hook-form';
import type { ReactNode } from 'react';
import { STATUS_LABELS, TASK_STATUSES, TaskStatus, type Task, type TaskDraft } from '../types/task';
import { Button } from './ui/Button';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (values: TaskDraft) => void;
  onCancel: () => void;
}

const TITLE_MAX_LENGTH = 100;
const controlClasses =
  'mt-1.5 block w-full rounded-lg px-3 py-2 text-sm text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-900';

const VALIDATION_RULES: Partial<Record<keyof TaskDraft, RegisterOptions<TaskDraft>>> = {
  title: {
    setValueAs: (value: string) => value.trim(),
    required: 'Title is required.',
    maxLength: {
      value: TITLE_MAX_LENGTH,
      message: `Title must be ${TITLE_MAX_LENGTH} characters or fewer.`,
    },
  },
  description: {
    setValueAs: (value: string) => value.trim(),
  },
  dueDate: {
    required: 'Due date is required.',
  },
};

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700">
      {children}
      {required && <span className="ml-0.5 text-red-600">*</span>}
    </label>
  );
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-600">
      {children}
    </p>
  );
}

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskDraft>({
    defaultValues: {
      title: task?.title ?? '',
      description: task?.description ?? '',
      status: task?.status ?? TaskStatus.Pending,
      dueDate: task?.dueDate ?? '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <Label htmlFor="title" required>
          Title
        </Label>
        <input
          id="title"
          placeholder="What needs doing?"
          aria-invalid={errors.title ? true : undefined}
          aria-describedby={errors.title ? 'title-error' : undefined}
          className={`${controlClasses} ${errors.title ? 'ring-red-400' : ''}`}
          {...register('title', VALIDATION_RULES.title)}
        />
        <FieldError id="title-error">{errors.title?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          rows={3}
          placeholder="Any extra detail (optional)"
          className={`${controlClasses} resize-y`}
          {...register('description', VALIDATION_RULES.description)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="status">Status</Label>
          <select id="status" className={controlClasses} {...register('status')}>
            {TASK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="dueDate" required>
            Due date
          </Label>
          <input
            id="dueDate"
            type="date"
            aria-invalid={errors.dueDate ? true : undefined}
            aria-describedby={errors.dueDate ? 'due-date-error' : undefined}
            className={`${controlClasses} ${errors.dueDate ? 'ring-red-400' : ''}`}
            {...register('dueDate', VALIDATION_RULES.dueDate)}
          />
          <FieldError id="due-date-error">{errors.dueDate?.message}</FieldError>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{task ? 'Save changes' : 'Add task'}</Button>
      </div>
    </form>
  );
}

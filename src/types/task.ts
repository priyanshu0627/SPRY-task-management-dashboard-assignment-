/**
 * Status values as a const object rather than a TS enum.
 *
 * Enums emit runtime code and are awkward to iterate; this gives named
 * constants, a derived union type and a real array to map over, all from one
 * declaration.
 */
export const TaskStatus = {
  Pending: 'pending',
  InProgress: 'in-progress',
  Completed: 'completed',
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TASK_STATUSES = Object.values(TaskStatus);

export const STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.Pending]: 'Pending',
  [TaskStatus.InProgress]: 'In Progress',
  [TaskStatus.Completed]: 'Completed',
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  /** ISO calendar date (YYYY-MM-DD). No time component — the app only deals in whole days. */
  dueDate: string;
}

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
  dueDate: string;
}

export type TaskDraft = Pick<Task, 'title' | 'description' | 'status' | 'dueDate'>;

export type StatusFilter = TaskStatus | 'all';

export type SortDirection = 'asc' | 'desc';

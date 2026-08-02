import { TaskStatus, type Task } from '../types/task';

export type StatusCounts = Record<TaskStatus, number> & { total: number };

export function countByStatus(tasks: Task[]): StatusCounts {
  return {
    total: tasks.length,
    [TaskStatus.Pending]: tasks.filter((task) => task.status === TaskStatus.Pending).length,
    [TaskStatus.InProgress]: tasks.filter((task) => task.status === TaskStatus.InProgress).length,
    [TaskStatus.Completed]: tasks.filter((task) => task.status === TaskStatus.Completed).length,
  };
}

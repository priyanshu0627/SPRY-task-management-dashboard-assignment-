import { TaskStatus, type Task } from '../types/task';

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Task Title 1',
    description: 'Task Desc 1',
    status: TaskStatus.InProgress,
    dueDate: '2026-08-14',
  },
  {
    id: '2',
    title: 'Task Title 2',
    description: 'Task Desc 2',
    status: TaskStatus.Pending,
    dueDate: '2026-08-21',
  },
  {
    id: '3',
    title: 'Task Title 3',
    description: 'Task Desc 3',
    status: TaskStatus.Pending,
    dueDate: '2026-07-28',
  },
  {
    id: '4',
    title: 'Task Title 4',
    description: 'Task Desc 4',
    status: TaskStatus.Completed,
    dueDate: '2026-07-24',
  },
  {
    id: '5',
    title: 'Task Title 5',
    description: 'Task Desc 5',
    status: TaskStatus.Pending,
    dueDate: '2026-09-02',
  },
];

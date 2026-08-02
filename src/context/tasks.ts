import { createContext, useContext } from 'react';
import type { Task } from '../types/task';

export interface TasksValue {
  tasks: Task[];
  openCreateForm: () => void;
  openEditForm: (task: Task) => void;
  requestDelete: (task: Task) => void;
}

export const TasksContext = createContext<TasksValue | null>(null);

export function useTasks(): TasksValue {
  const context = useContext(TasksContext);
  if (context === null) {
    throw new Error('useTasks must be used inside a TasksProvider');
  }
  return context;
}

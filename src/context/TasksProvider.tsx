import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { TaskForm } from '../components/TaskForm';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Modal } from '../components/ui/Modal';
import { INITIAL_TASKS } from '../data/tasks';
import { readFromStorage, writeToStorage } from '../lib/storage';
import type { Task, TaskDraft } from '../types/task';
import { TasksContext, type TasksValue } from './tasks';

const STORAGE_KEY = 'task-dashboard.tasks';

function loadTasks(): Task[] {
  const stored = readFromStorage<Task[]>(STORAGE_KEY, INITIAL_TASKS);
  return Array.isArray(stored) ? stored : INITIAL_TASKS;
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskPendingDelete, setTaskPendingDelete] = useState<Task | null>(null);

  useEffect(() => {
    writeToStorage(STORAGE_KEY, tasks);
  }, [tasks]);

  const openCreateForm = useCallback(() => {
    setEditingTask(null);
    setIsFormOpen(true);
  }, []);

  const openEditForm = useCallback((task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  }, []);

  const requestDelete = useCallback((task: Task) => setTaskPendingDelete(task), []);

  const value = useMemo<TasksValue>(
    () => ({ tasks, openCreateForm, openEditForm, requestDelete }),
    [tasks, openCreateForm, openEditForm, requestDelete],
  );

  const handleSubmit = (values: TaskDraft) => {
    setTasks((current) =>
      editingTask
        ? current.map((task) => (task.id === editingTask.id ? { ...task, ...values } : task))
        : [{ id: crypto.randomUUID(), ...values }, ...current],
    );
    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!taskPendingDelete) return;
    setTasks((current) => current.filter((task) => task.id !== taskPendingDelete.id));
    setTaskPendingDelete(null);
  };

  return (
    <TasksContext.Provider value={value}>
      {children}

      <Modal
        open={isFormOpen}
        title={editingTask ? 'Edit task' : 'Add task'}
        onClose={() => setIsFormOpen(false)}
      >
        <TaskForm task={editingTask} onSubmit={handleSubmit} onCancel={() => setIsFormOpen(false)} />
      </Modal>

      <ConfirmDialog
        open={taskPendingDelete !== null}
        title="Delete task"
        message={`"${taskPendingDelete?.title}" will be removed. This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setTaskPendingDelete(null)}
      />
    </TasksContext.Provider>
  );
}

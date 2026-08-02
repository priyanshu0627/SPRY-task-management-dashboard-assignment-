import { useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskSummary } from './components/TaskSummary';
import { Button } from './components/ui/Button';
import { ConfirmDialog } from './components/ui/ConfirmDialog';
import { Modal } from './components/ui/Modal';
import { INITIAL_TASKS } from './data/tasks';
import { countByStatus } from './lib/tasks';
import type { Task, TaskDraft } from './types/task';

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskPendingDelete, setTaskPendingDelete] = useState<Task | null>(null);

  const counts = countByStatus(tasks);

  const openCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditForm = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

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
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Task Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">
              Track what needs doing, what is in flight and what is done.
            </p>
          </div>
          <Button onClick={openCreateForm}>Add task</Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
        <TaskSummary counts={counts} />
        <TaskList tasks={tasks} onEdit={openEditForm} onDelete={setTaskPendingDelete} />
      </main>

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
    </div>
  );
}

export default App;

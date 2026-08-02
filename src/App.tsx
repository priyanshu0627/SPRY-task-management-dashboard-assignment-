import { useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskSummary } from './components/TaskSummary';
import { Button } from './components/ui/Button';
import { Modal } from './components/ui/Modal';
import { INITIAL_TASKS } from './data/tasks';
import { countByStatus } from './lib/tasks';
import type { Task, TaskDraft } from './types/task';

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const counts = countByStatus(tasks);

  const handleCreate = (values: TaskDraft) => {
    const task: Task = { id: crypto.randomUUID(), ...values };
    setTasks((current) => [task, ...current]);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Task Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">
              ABC dashboard
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>Add task</Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
        <TaskSummary counts={counts} />
        <TaskList tasks={tasks} />
      </main>
      
      <Modal open={isFormOpen} title="Add task" onClose={() => setIsFormOpen(false)}>
        <TaskForm onSubmit={handleCreate} onCancel={() => setIsFormOpen(false)} />
      </Modal>
    </div>
  );
}

export default App;

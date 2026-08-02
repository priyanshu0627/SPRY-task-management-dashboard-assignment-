import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { TaskForm } from './components/TaskForm';
import { TaskSummary } from './components/TaskSummary';
import { AppHeader } from './components/layout/AppHeader';
import { ConfirmDialog } from './components/ui/ConfirmDialog';
import { Modal } from './components/ui/Modal';
import { INITIAL_TASKS } from './data/tasks';
import { countByStatus } from './lib/tasks';
import { AllTasksPage } from './pages/AllTasksPage';
import { CompletedTasksPage } from './pages/CompletedTasksPage';
import type { SortDirection, StatusFilter, Task, TaskDraft } from './types/task';

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskPendingDelete, setTaskPendingDelete] = useState<Task | null>(null);

  const counts = countByStatus(tasks);

  const toggleSortDirection = () =>
    setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));

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
    <BrowserRouter>
      <div className="min-h-screen">
        <AppHeader onAddTask={openCreateForm} />

        <main className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
          <TaskSummary counts={counts} />

          <Routes>
            <Route
              path="/"
              element={
                <AllTasksPage
                  tasks={tasks}
                  statusFilter={statusFilter}
                  sortDirection={sortDirection}
                  onStatusChange={setStatusFilter}
                  onSortDirectionToggle={toggleSortDirection}
                  onEdit={openEditForm}
                  onDelete={setTaskPendingDelete}
                />
              }
            />
            <Route
              path="/completed"
              element={
                <CompletedTasksPage
                  tasks={tasks}
                  sortDirection={sortDirection}
                  onSortDirectionToggle={toggleSortDirection}
                  onEdit={openEditForm}
                  onDelete={setTaskPendingDelete}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Modal
          open={isFormOpen}
          title={editingTask ? 'Edit task' : 'Add task'}
          onClose={() => setIsFormOpen(false)}
        >
          <TaskForm
            task={editingTask}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
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
    </BrowserRouter>
  );
}

export default App;

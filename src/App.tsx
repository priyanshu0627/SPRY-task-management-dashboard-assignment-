import { TaskList } from './components/TaskList';
import { TaskSummary } from './components/TaskSummary';
import { INITIAL_TASKS } from './data/tasks';
import { countByStatus } from './lib/tasks';

function App() {
  const tasks = INITIAL_TASKS;
  const counts = countByStatus(tasks);

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
          <h1 className="text-xl font-semibold tracking-tight">Task Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Track what needs doing, what is in flight and what is done.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
        <TaskSummary counts={counts} />
        <TaskList tasks={tasks} />
      </main>
    </div>
  );
}

export default App;

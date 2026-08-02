import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { TaskSummary } from './components/TaskSummary';
import { AppHeader } from './components/layout/AppHeader';
import { TaskFiltersProvider } from './context/TaskFiltersProvider';
import { TasksProvider } from './context/TasksProvider';
import { AllTasksPage } from './pages/AllTasksPage';
import { CompletedTasksPage } from './pages/CompletedTasksPage';

function App() {
  return (
    <BrowserRouter>
      <TasksProvider>
        <TaskFiltersProvider>
          <div className="min-h-screen">
            <AppHeader />

            <main className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
              <TaskSummary />

              <Routes>
                <Route path="/" element={<AllTasksPage />} />
                <Route path="/completed" element={<CompletedTasksPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </TaskFiltersProvider>
      </TasksProvider>
    </BrowserRouter>
  );
}

export default App;

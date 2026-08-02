import { NavLink } from 'react-router-dom';
import { useTasks } from '../../context/tasks';
import { Button } from '../ui/Button';

const NAV_LINKS = [
  { to: '/', label: 'All Tasks' },
  { to: '/completed', label: 'Completed' },
];

export function AppHeader() {
  const { openCreateForm } = useTasks();

  return (
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

      <nav className="mx-auto max-w-5xl px-4 sm:px-6">
        <ul className="-mb-px flex gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) =>
                  `inline-block border-b-2 pb-3 text-sm font-medium transition ${
                    isActive
                      ? 'border-slate-900 text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

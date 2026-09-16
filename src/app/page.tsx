import { getTasks } from '@/app/actions';
import TaskForm from '@/components/TaskForm';
import TaskCard from '@/components/TaskCard';
import { LayoutDashboard, CheckCircle2, Clock, ListTodo } from 'lucide-react';

export default async function Dashboard() {
const tasks = await getTasks();

const total = tasks.length;
const pending = tasks.filter((t) => t.status === 'PENDING').length;
const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
const completed = tasks.filter((t) => t.status === 'COMPLETED').length;

return (
<main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-6 md:p-12 max-w-6xl mx-auto">
<header className="mb-8">
<h1 className="text-3xl font-bold flex items-center gap-3">
<LayoutDashboard className="text-indigo-600" /> Task Management Dashboard
</h1>
<p className="text-zinc-500 text-sm mt-1">Organize and track your daily priorities.</p>
</header>

<section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
<div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
<p className="text-xs text-zinc-400 font-medium">Total Tasks</p>
<p className="text-2xl font-bold mt-1">{total}</p>
</div>
<div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
<p className="text-xs text-yellow-500 font-medium flex items-center gap-1">
<Clock size={14} /> Pending
</p>
<p className="text-2xl font-bold mt-1">{pending}</p>
</div>
<div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
<p className="text-xs text-blue-500 font-medium flex items-center gap-1">
<ListTodo size={14} /> In Progress
</p>
<p className="text-2xl font-bold mt-1">{inProgress}</p>
</div>
<div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
<p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
<CheckCircle2 size={14} /> Completed
</p>
<p className="text-2xl font-bold mt-1">{completed}</p>
</div>
</section>
<TaskForm />

<section>
<h2 className="text-xl font-semibold mb-4">Tasks Overview</h2>
{tasks.length === 0 ? (
<div className="text-center py-12 text-zinc-400 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
No tasks found. Create one above to get started!
</div>
) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{tasks.map((task) => (
<TaskCard key={task.id} task={task} />
))}
</div>
)}
</section>
</main>
);
}
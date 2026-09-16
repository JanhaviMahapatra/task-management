'use client';

import { updateTaskStatus, deleteTask } from '@/app/actions';
import { Trash2, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

interface TaskProps {
id: string;
title: string;
description?: string | null;
status: string;
priority: string;
}

export default function TaskCard({ task }: { task: TaskProps }) {
const priorityColors = {
LOW: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
MEDIUM: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
HIGH: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

return (
<div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
<div className="space-y-2">
<div className="flex items-center justify-between gap-2">
<span
className={`text-xs px-2.5 py-1 rounded-full font-medium ${
priorityColors[task.priority as keyof typeof priorityColors] || priorityColors.MEDIUM
}`}
>
{task.priority}
</span>
<button
onClick={() => deleteTask(task.id)}
className="text-zinc-400 hover:text-red-500 p-1.5 rounded-lg transition-colors cursor-pointer"
title="Delete Task"
>
<Trash2 size={16} />
</button>
</div>

<h3
className={`font-semibold text-zinc-900 dark:text-zinc-100 ${
task.status === 'COMPLETED' ? 'line-through text-zinc-400 dark:text-zinc-500' : ''
}`}
>
{task.title}
</h3>

{task.description && (
<p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">{task.description}</p>
)}
</div>

<div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
<span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
{task.status.replace('_', ' ')}
</span>

<div className="flex gap-1">
{task.status !== 'PENDING' && (
<button
onClick={() => updateTaskStatus(task.id, 'PENDING')}
className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
title="Mark Pending"
>
<Clock size={16} />
</button>
)}
{task.status !== 'IN_PROGRESS' && (
<button
onClick={() => updateTaskStatus(task.id, 'IN_PROGRESS')}
className="p-1.5 text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
title="Mark In Progress"
>
<PlayCircle size={16} />
</button>
)}
{task.status !== 'COMPLETED' && (
<button
onClick={() => updateTaskStatus(task.id, 'COMPLETED')}
className="p-1.5 text-emerald-500 hover:text-emerald-700 transition-colors cursor-pointer"
title="Mark Completed"
>
<CheckCircle2 size={16} />
</button>
)}
</div>
</div>
</div>
);
}
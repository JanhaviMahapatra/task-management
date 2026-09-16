'use client';

import { createTask } from '@/app/actions';
import { useRef } from 'react';
import { Plus } from 'lucide-react';

export default function TaskForm() {
const formRef = useRef<HTMLFormElement>(null);

return (
<form
ref={formRef}
action={async (formData) => {
await createTask(formData);
formRef.current?.reset();
}}
className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-8 space-y-4"
>
<h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Create New Task</h2>

<div className="flex flex-col md:flex-row gap-4">
<input
type="text"
name="title"
placeholder="Task title..."
required
className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
<select
name="priority"
defaultValue="MEDIUM"
className="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
>
<option value="LOW">Low Priority</option>
<option value="MEDIUM">Medium Priority</option>
<option value="HIGH">High Priority</option>
</select>
</div>

<textarea
name="description"
placeholder="Add details or context (optional)..."
rows={2}
className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

<button
type="submit"
className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-colors cursor-pointer"
>
<Plus size={16} /> Add Task
</button>
</form>
);
}
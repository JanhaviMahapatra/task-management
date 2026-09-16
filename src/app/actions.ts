'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getTasks() {
  return await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as string;

  if (!title) return;

  await prisma.task.create({
    data: {
      title,
      description,
      priority: priority || 'MEDIUM',
      status: 'PENDING',
    },
  });

  revalidatePath('/');
}

export async function updateTaskStatus(id: string, status: string) {
  await prisma.task.update({
    where: { id },
    data: { status },
  });

  revalidatePath('/');
}

export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: { id },
  });

  revalidatePath('/');
}
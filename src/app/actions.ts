'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getTasks() {
  try {
    return await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return [];
  }
}

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const priority = (formData.get('priority') as string) || 'MEDIUM';

  if (!title) return { error: 'Title is required' };

  try {
    await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status: 'PENDING',
      },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
}

export async function updateTaskStatus(id: string, status: string) {
  try {
    await prisma.task.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating task status:', error);
    throw new Error('Failed to update task status');
  }
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({
      where: { id },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task');
  }
}
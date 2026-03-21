export interface TaskDTO {
  id?: number;
  title: string;
  description: string;
  status: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
  createdAt?: string;
  updatedAt?: string;
}

export type TaskStatus = 'TO_DO' | 'IN_PROGRESS' | 'DONE';

export const TASK_STATUS_OPTIONS: TaskStatus[] = ['TO_DO', 'IN_PROGRESS', 'DONE'];
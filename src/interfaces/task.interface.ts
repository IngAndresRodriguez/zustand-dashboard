export type TaskStatus =
  | 'open'
  | 'in-progress'
  | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus
}
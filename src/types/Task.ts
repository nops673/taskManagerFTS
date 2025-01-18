import { User } from "./User";

export type TaskPriority = ETaskPriority.LOW | ETaskPriority.MEDIUM | ETaskPriority.HIGH;
export type TaskStatus = ETaskStatus.PENDING | ETaskStatus.IN_PROGRESS | ETaskStatus.COMPLETED;


export interface Task {
  id: number | null;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  dueDate: Date | null;
  assignedTo: User | null;
}


export enum ETaskStatus {
  PENDING = 'pendente',
  IN_PROGRESS = 'em progresso',
  COMPLETED = 'concluída'
}

export enum ETaskPriority {
  LOW = 'baixa',
  MEDIUM = 'média',
  HIGH = 'alta'
}
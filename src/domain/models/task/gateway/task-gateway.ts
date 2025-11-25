import { Task } from '../task';

export abstract class TaskRepository {
  abstract getAll(): Promise<Task[]>;

  abstract getById(id: string): Promise<Task | null>;

  abstract create(task: Task): Promise<void>;

  abstract update(task: Task): Promise<void>;

  abstract delete(id: string): Promise<void>;
}

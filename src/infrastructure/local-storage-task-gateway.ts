import { Task } from '../domain/models/task/task';
import { TaskGateway } from '../domain/models/task/gateway/task-gateway';

export class LocalStorageTaskGateway extends TaskGateway {
  private readonly STORAGE_KEY = 'tasks';

  async getAll(): Promise<Task[]> {
    const tasksJson = localStorage.getItem(this.STORAGE_KEY);

    if (!tasksJson) {
      return [];
    }

    try {
      return JSON.parse(tasksJson) as Task[];
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      return [];
    }
  }

  async create(task: Task): Promise<void> {
    const tasks = await this.getAll();
    tasks.push(task);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  // Los demás métodos se implementarán después
  async getById(): Promise<any> {
    throw new Error("Not implemented yet");
  }

  async update(): Promise<any> {
    throw new Error("Not implemented yet");
  }

  async delete(): Promise<any> {
    throw new Error("Not implemented yet");
  }
}

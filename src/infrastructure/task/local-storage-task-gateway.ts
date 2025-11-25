import { Task } from '../../domain/models/task/task';
import { TaskGateway } from '../../domain/models/task/gateway/task-gateway';

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

  async getById(id: string): Promise<Task | null> {
    const tasks = await this.getAll();
    const task = tasks.find((t) => t.id === id);
    return task || null;
  }

  async update(task: Task): Promise<void> {
    const tasks = await this.getAll();
    const index = tasks.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      tasks[index] = task;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    }
  }

  async delete(id: string): Promise<void> {
    const tasks = await this.getAll();
    const filteredTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredTasks));
  }
}

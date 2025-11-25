import { Task } from '../models/task/task';
import { TaskGateway } from '../models/task/gateway/task-gateway';

export class GetAllTaskUseCase {
  constructor(private taskGateway: TaskGateway) {}

  async run(): Promise<Task[]> {
    return this.taskGateway.getAll();
  }
}

import { TaskGateway } from "src/domain/models/task/gateway/task-gateway";
import { Task } from "src/domain/models/task/task";

export class GetAllTaskUseCase {
  constructor(private taskGateway: TaskGateway) { }

  async run(): Promise<Task[]> {
    return this.taskGateway.getAll();
  }
}

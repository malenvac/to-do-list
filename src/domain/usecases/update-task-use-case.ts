import { Task } from '../models/task/task';
import { TaskGateway } from '../models/task/gateway/task-gateway';

export class UpdateTaskUseCase {
    constructor(private taskGateway: TaskGateway) { }

    async run(task: Task): Promise<void> {
        return this.taskGateway.update(task);
    }
}

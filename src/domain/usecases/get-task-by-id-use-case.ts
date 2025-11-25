import { Task } from '../models/task/task';
import { TaskGateway } from '../models/task/gateway/task-gateway';

export class GetTaskByIdUseCase {
    constructor(private taskGateway: TaskGateway) { }

    async run(id: string): Promise<Task | null> {
        return this.taskGateway.getById(id);
    }
}

import { TaskGateway } from '../models/task/gateway/task-gateway';

export class DeleteTaskUseCase {
    constructor(private taskGateway: TaskGateway) { }

    async run(id: string): Promise<void> {
        return this.taskGateway.delete(id);
    }
}

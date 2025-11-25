import { TaskGateway } from "src/domain/models/task/gateway/task-gateway";
import { Task } from "src/domain/models/task/task";


export class GetTaskByIdUseCase {
    constructor(private taskGateway: TaskGateway) { }

    async run(id: string): Promise<Task | null> {
        return this.taskGateway.getById(id);
    }
}

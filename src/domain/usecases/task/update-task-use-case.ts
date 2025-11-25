import { TaskGateway } from "src/domain/models/task/gateway/task-gateway";
import { Task } from "src/domain/models/task/task";


export class UpdateTaskUseCase {
    constructor(private taskGateway: TaskGateway) { }

    async run(task: Task): Promise<void> {
        return this.taskGateway.update(task);
    }
}

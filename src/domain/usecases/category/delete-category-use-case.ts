import { CategoryGateway } from "src/domain/models/category/gateway/category-gateway";

export class DeleteCategoryUseCase {

    constructor(private categoryGateway: CategoryGateway) { }

    async execute(id: string): Promise<void> {
        await this.categoryGateway.deleteCategory(id);
    }
}
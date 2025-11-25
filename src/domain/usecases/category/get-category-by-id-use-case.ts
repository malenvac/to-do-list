import { Category } from "src/domain/models/category/category";
import { CategoryGateway } from "src/domain/models/category/gateway/category-gateway";

export class GetCategoryByIdUseCase {
    constructor(private categoryGateway: CategoryGateway) { }

    async execute(id: string): Promise<Category | null> {
        return await this.categoryGateway.getCategoryById(id);
    }
}
import { Category } from "src/domain/models/category/category";
import { CategoryGateway } from "src/domain/models/category/gateway/category-gateway";

export class UpdateCategoryUseCase {
    constructor(private categoryGateway: CategoryGateway) { }

    async execute(category: Category): Promise<void> {
        await this.categoryGateway.updateCategory(category);
    }

}
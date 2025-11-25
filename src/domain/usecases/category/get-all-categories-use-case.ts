import { Category } from "src/domain/models/category/category";
import { CategoryGateway } from "src/domain/models/category/gateway/category-gateway";

export class GetAllCategoriesUseCase {
    constructor(private categoryGateway: CategoryGateway) { }

    async execute(): Promise<Category[]> {
        return await this.categoryGateway.getAllCategories();
    }
}
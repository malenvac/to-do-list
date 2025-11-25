import { Category } from "src/domain/models/category/category";
import { CategoryGateway } from "src/domain/models/category/gateway/category-gateway";


export class GetCategoryByNameUseCase {
    constructor(private categoryGateway: CategoryGateway) { }

    async execute(name: string): Promise<Category | null> {
        return await this.categoryGateway.getCategoryByName(name);
    }
}
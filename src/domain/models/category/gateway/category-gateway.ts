import { Category } from "../category";


export abstract class CategoryGateway {

    abstract createCategory(category: Category): Promise<void>;

    abstract updateCategory(category: Category): Promise<void>;

    abstract deleteCategory(id: string): Promise<void>;

    abstract getAllCategories(): Promise<Category[]>

    abstract getCategoryById(id: string): Promise<Category | null>

    abstract getCategoryByName(name: string): Promise<Category | null>
}
import { Category } from "src/domain/models/category/category";
import { CategoryGateway } from "src/domain/models/category/gateway/category-gateway";


export class LocalStorageCategoryGateway extends CategoryGateway {
    private readonly STORAGE_KEY = 'categories';

    override async createCategory(category: Category): Promise<void> {
        const categories = await this.getAllCategories();
        categories.push(category);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
    }
    override async updateCategory(category: Category): Promise<void> {

        const categories = await this.getAllCategories();
        const index = categories.findIndex((c) => c.id === category.id);

        if (index !== -1) {
            categories[index] = category;
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
        }
    }
    override async deleteCategory(id: string): Promise<void> {

        const categories = await this.getAllCategories();

        try {
            const updatedCategories = categories.filter((category) => category.id !== id);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedCategories));
            return;

        } catch (error) {
            console.error("Error deleting category from localStorage:", error);
        }
    }
    override async getAllCategories(): Promise<Category[]> {

        const categoryJSON = localStorage.getItem(this.STORAGE_KEY);

        if (!categoryJSON) {
            return [];
        }

        try {
            return JSON.parse(categoryJSON) as Category[];
        } catch (error) {
            console.error("Error parsing categories from localStorage:", error);
            return [];
        }

    }

    override async getCategoryById(id: string): Promise<Category | null> {

        const categories = await this.getAllCategories();

        try {
            return categories.find((category) => category.id === id) || null;
        } catch (error) {
            console.error("Error parsing categories from localStorage:", error);
            return null;
        }
    }
    override async getCategoryByName(name: string): Promise<Category | null> {

        const categories = await this.getAllCategories();

        try {
            return categories.find((category) => category.name === name) || null;
        } catch (error) {
            console.error("Error parsing categories from localStorage:", error);
            return null;
        }
    }

}
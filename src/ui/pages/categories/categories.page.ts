import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, trash, create, folderOutline, ellipsisHorizontal } from 'ionicons/icons';
import { Category } from '../../../domain/models/category/category';
import { GetAllCategoriesUseCase } from '../../../domain/usecases/category/get-all-categories-use-case';
import { DeleteCategoryUseCase } from '../../../domain/usecases/category/delete-category-use-case';
import { GetCategoryByIdUseCase } from '../../../domain/usecases/category/get-category-by-id-use-case';
import { GetCategoryByNameUseCase } from '../../../domain/usecases/category/get-category-by-name-use-case';

@Component({
    selector: 'app-categories',
    templateUrl: 'categories.page.html',
    styleUrls: ['categories.page.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterModule, FormsModule],
})
export class CategoriesPage {
    categories: Category[] = [];

    constructor(
        private getAllCategoriesUseCase: GetAllCategoriesUseCase,
        private deleteCategoryUseCase: DeleteCategoryUseCase,
        private getCategoryByIdUseCase: GetCategoryByIdUseCase,
        private getCategoryByNameUseCase: GetCategoryByNameUseCase
    ) {
        addIcons({ add, trash, create, folderOutline, ellipsisHorizontal });
    }

    async ionViewWillEnter() {
        await this.loadCategories();
    }

    async loadCategories() {
        this.categories = await this.getAllCategoriesUseCase.execute();
    }

    async handleSearch(event: any) {
        const query = event.target.value;
        if (query && query.trim() !== '') {
            // Intentar buscar por ID primero
            let category = await this.getCategoryByIdUseCase.execute(query);

            // Si no se encuentra por ID, buscar por nombre
            if (!category) {
                category = await this.getCategoryByNameUseCase.execute(query);
            }

            this.categories = category ? [category] : [];
        } else {
            await this.loadCategories();
        }
    }

    async deleteCategory(id: string) {
        await this.deleteCategoryUseCase.execute(id);
        await this.loadCategories();
    }
}

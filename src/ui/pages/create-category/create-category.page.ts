import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { Category } from '../../../domain/models/category/category';
import { v4 as uuidv4 } from 'uuid';
import { CreateCategoryUseCase } from '../../../domain/usecases/category/create-category-use-case';
import { GetCategoryByIdUseCase } from '../../../domain/usecases/category/get-category-by-id-use-case';
import { UpdateCategoryUseCase } from '../../../domain/usecases/category/update-category-use-case';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.page.html',
    styleUrls: ['./create-category.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateCategoryPage implements OnInit {
    name: string = '';
    isEditMode: boolean = false;
    categoryId: string | null = null;
    categoryCreatedAt: number = Date.now();

    constructor(
        private createCategoryUseCase: CreateCategoryUseCase,
        private getCategoryByIdUseCase: GetCategoryByIdUseCase,
        private updateCategoryUseCase: UpdateCategoryUseCase,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.categoryId = this.route.snapshot.paramMap.get('id');
        if (this.categoryId) {
            this.isEditMode = true;
            const category = await this.getCategoryByIdUseCase.execute(this.categoryId);
            if (category) {
                this.name = category.name;
                this.categoryCreatedAt = category.createdAt;
            }
        }
    }
    goBack() {
    this.router.navigate(['/categories']);
    }

    async saveCategory() {
        if (!this.name.trim()) {
            return;
        }

        if (this.isEditMode && this.categoryId) {
            const updatedCategory: Category = {
                id: this.categoryId,
                name: this.name,
                createdAt: this.categoryCreatedAt,
                updatedAt: Date.now()
            };

            await this.updateCategoryUseCase.execute(updatedCategory);
        } else {
            const newCategory: Category = {
                id: uuidv4(),
                name: this.name,
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
            await this.createCategoryUseCase.execute(newCategory);
        }

        this.router.navigate(['/categories']);
    }
}

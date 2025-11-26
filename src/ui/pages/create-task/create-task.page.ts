import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { Task } from '../../../domain/models/task/task';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskUseCase } from '../../../domain/usecases/task/create-task-usecase';
import { GetTaskByIdUseCase } from '../../../domain/usecases/task/get-task-by-id-use-case';
import { UpdateTaskUseCase } from '../../../domain/usecases/task/update-task-use-case';

import { Category } from 'src/domain/models/category/category';
import { GetAllCategoriesUseCase } from 'src/domain/usecases/category/get-all-categories-use-case';

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.page.html',
    styleUrls: ['./create-task.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateTaskPage implements OnInit {

    title: string = '';
    description: string = '';
    isEditMode: boolean = false;

    taskId: string | null = null;
    taskCreatedAt: number = Date.now();
    taskCompleted: boolean = false;

    categories: Category[] = [];
    selectedCategoryId: string | null = null;
    selectedCategoryName: string | null = null;


    constructor(
        private createTaskUseCase: CreateTaskUseCase,
        private getTaskByIdUseCase: GetTaskByIdUseCase,
        private updateTaskUseCase: UpdateTaskUseCase,
        private router: Router,
        private route: ActivatedRoute,
        private getAllCategoriesUseCase: GetAllCategoriesUseCase,
    ) {}

    async ngOnInit() {
        this.taskId = this.route.snapshot.paramMap.get('id');

        await this.loadCategories();

        if (this.taskId) {
            this.isEditMode = true;

            const task = await this.getTaskByIdUseCase.run(this.taskId);

            if (task) {
                this.title = task.title;
                this.description = task.description ?? '';
                this.taskCreatedAt = task.createdAt;
                this.taskCompleted = task.completed;

                this.selectedCategoryId = task.categoryId ?? null;
            }
        }
    }

    async ionViewWillEnter() {
        await this.loadCategories();
    }

    private async loadCategories() {
        this.categories = await this.getAllCategoriesUseCase.execute();
    }

    goBack() {
        this.router.navigate(['/home']);
    }
    goToCreateCategory() {
  this.router.navigate(['/create-category']);
}

    async saveTask() {
        if (!this.title.trim()) return;

        if (this.isEditMode && this.taskId) {

            const updatedTask: Task = {
                id: this.taskId,
                title: this.title,
                description: this.description,
                completed: this.taskCompleted,
                createdAt: this.taskCreatedAt,
                updatedAt: Date.now(),
                categoryId: this.selectedCategoryId ?? null,
                categoryName: this.selectedCategoryName ?? null
            };

            await this.updateTaskUseCase.run(updatedTask);

        } else {

            const newTask: Task = {
                id: uuidv4(),
                title: this.title,
                description: this.description,
                completed: false,
                createdAt: Date.now(),
                
                categoryId: this.selectedCategoryId ?? null,
                categoryName: this.selectedCategoryName ?? null
            };

            await this.createTaskUseCase.run(newTask);
        }

        this.router.navigate(['/home']);
    }

    selectCategory(category: Category) {
        this.selectedCategoryId = category.id;
        this.selectedCategoryName = category.name;
    }
}

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

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.page.html',
    styleUrls: ['./create-task.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateTaskPage implements OnInit {
    title: string = '';
    isEditMode: boolean = false;
    taskId: string | null = null;
    taskCreatedAt: number = Date.now();
    taskCompleted: boolean = false;

    constructor(
        private createTaskUseCase: CreateTaskUseCase,
        private getTaskByIdUseCase: GetTaskByIdUseCase,
        private updateTaskUseCase: UpdateTaskUseCase,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.taskId = this.route.snapshot.paramMap.get('id');
        if (this.taskId) {
            this.isEditMode = true;
            const task = await this.getTaskByIdUseCase.run(this.taskId);
            if (task) {
                this.title = task.title;
                this.taskCreatedAt = task.createdAt;
                this.taskCompleted = task.completed;
            }
        }
    }

    async saveTask() {
        if (!this.title.trim()) {
            return;
        }

        if (this.isEditMode && this.taskId) {
            const updatedTask: Task = {
                id: this.taskId,
                title: this.title,
                completed: this.taskCompleted,
                createdAt: this.taskCreatedAt,
                updatedAt: Date.now()
            };

            await this.updateTaskUseCase.run(updatedTask);
        } else {
            const newTask: Task = {
                id: uuidv4(),
                title: this.title,
                completed: false,
                createdAt: Date.now()
            };
            await this.createTaskUseCase.run(newTask);
        }

        this.router.navigate(['/home']);
    }
}

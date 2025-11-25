import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CreateTaskUseCase } from '../../domain/usecases/create-task-usecase';
import { Task } from '../../domain/models/task/task';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.page.html',
    styleUrls: ['./create-task.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateTaskPage {
    title: string = '';

    constructor(
        private createTaskUseCase: CreateTaskUseCase,
        private router: Router
    ) { }

    async saveTask() {
        if (!this.title.trim()) {
            return;
        }

        const newTask: Task = {
            id: uuidv4(),
            title: this.title,
            completed: false,
            createdAt: Date.now()
        };

        await this.createTaskUseCase.run(newTask);
        this.router.navigate(['/home']);
    }
}

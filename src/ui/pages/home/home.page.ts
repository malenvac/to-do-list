import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, trash, create, gridOutline, ellipsisHorizontal } from 'ionicons/icons';
import { Task } from '../../../domain/models/task/task';
import { GetAllTaskUseCase } from '../../../domain/usecases/task/get-all-tasks-usecase';
import { DeleteTaskUseCase } from '../../../domain/usecases/task/delete-task-usecase';
import { GetTaskByIdUseCase } from '../../../domain/usecases/task/get-task-by-id-use-case';
import { UpdateTaskUseCase } from '../../../domain/usecases/task/update-task-use-case';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule],
})
export class HomePage {
  tasks: Task[] = [];
  today = '';

  constructor(
    private getAllTaskUseCase: GetAllTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private getTaskByIdUseCase: GetTaskByIdUseCase,
    private updateTaskUseCase: UpdateTaskUseCase
  ) {
    addIcons({ add, trash, create, gridOutline, ellipsisHorizontal });

    const now = new Date();
    const formatter = new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    this.today = formatter.format(now); // ej: "25 de noviembre de 2025"
  }

  async ionViewWillEnter() {
    await this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await this.getAllTaskUseCase.run();
  }

  async handleSearch(event: any) {
    const query = event.target.value;
    if (query && query.trim() !== '') {
      const task = await this.getTaskByIdUseCase.run(query);
      this.tasks = task ? [task] : [];
    } else {
      await this.loadTasks();
    }
  }

  async deleteTask(id: string) {
    await this.deleteTaskUseCase.run(id);
    await this.loadTasks();
  }

  async toggleCompletion(task: Task, event: any) {
    const updatedTask = { ...task, completed: event.detail.checked, updatedAt: Date.now() };
    await this.updateTaskUseCase.run(updatedTask);
    await this.loadTasks();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, trash, create, gridOutline, ellipsisHorizontal } from 'ionicons/icons';
import { Task } from '../../../domain/models/task/task';
import { GetAllTaskUseCase } from '../../../domain/usecases/task/get-all-tasks-usecase';
import { DeleteTaskUseCase } from '../../../domain/usecases/task/delete-task-usecase';
import { GetTaskByIdUseCase } from '../../../domain/usecases/task/get-task-by-id-use-case';
import { UpdateTaskUseCase } from '../../../domain/usecases/task/update-task-use-case';
import { RemoteConfigService } from 'src/infrastructure/firebase/remote-config.service';

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
  categoriesEnabled = true;

  constructor(
    private getAllTaskUseCase: GetAllTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private getTaskByIdUseCase: GetTaskByIdUseCase,
    private updateTaskUseCase: UpdateTaskUseCase,
    private remoteConfigService: RemoteConfigService,
    private router: Router
  ) {
    addIcons({ add, trash, create, gridOutline, ellipsisHorizontal });

    const now = new Date();
    const formatter = new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    this.today = formatter.format(now);
  }

  async ionViewWillEnter() {
    await this.loadTasks();
    this.categoriesEnabled = await this.remoteConfigService.isCategoriesEnabled();
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

  openCategories() {
    if (!this.categoriesEnabled) return;
    this.router.navigate(['/categories']);
  }
}

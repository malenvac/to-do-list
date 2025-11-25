import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, trash } from 'ionicons/icons';
import { GetAllTaskUseCase } from '../../domain/usecases/get-all-tasks-usecase';
import { Task } from '../../domain/models/task/task';

import { DeleteTaskUseCase } from '../../domain/usecases/delete-task-usecase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class HomePage {
  tasks: Task[] = [];

  constructor(
    private getAllTaskUseCase: GetAllTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase
  ) {
    addIcons({ add, trash });
  }

  async ionViewWillEnter() {
    await this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await this.getAllTaskUseCase.run();
  }

  async deleteTask(id: string) {
    await this.deleteTaskUseCase.run(id);
    await this.loadTasks();
  }
}

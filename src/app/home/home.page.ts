import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { GetAllTaskUseCase } from '../../domain/usecases/get-all-tasks-usecase';
import { Task } from '../../domain/models/task/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class HomePage {
  tasks: Task[] = [];

  constructor(private getAllTaskUseCase: GetAllTaskUseCase) {
    addIcons({ add });
  }

  async ionViewWillEnter() {
    this.tasks = await this.getAllTaskUseCase.run();
  }
}

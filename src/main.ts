import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { TaskGateway } from './domain/models/task/gateway/task-gateway';
import { LocalStorageTaskGateway } from './infrastructure/task/local-storage-task-gateway';
import { CreateTaskUseCase } from './domain/usecases/task/create-task-usecase';
import { DeleteTaskUseCase } from './domain/usecases/task/delete-task-usecase';
import { GetAllTaskUseCase } from './domain/usecases/task/get-all-tasks-usecase';
import { GetTaskByIdUseCase } from './domain/usecases/task/get-task-by-id-use-case';
import { UpdateTaskUseCase } from './domain/usecases/task/update-task-use-case';


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    { provide: TaskGateway, useClass: LocalStorageTaskGateway },
    {
      provide: CreateTaskUseCase,
      useFactory: (gateway: TaskGateway) => new CreateTaskUseCase(gateway),
      deps: [TaskGateway],
    },
    {
      provide: GetAllTaskUseCase,
      useFactory: (gateway: TaskGateway) => new GetAllTaskUseCase(gateway),
      deps: [TaskGateway],
    },
    {
      provide: DeleteTaskUseCase,
      useFactory: (gateway: TaskGateway) => new DeleteTaskUseCase(gateway),
      deps: [TaskGateway],
    },
    {
      provide: GetTaskByIdUseCase,
      useFactory: (gateway: TaskGateway) => new GetTaskByIdUseCase(gateway),
      deps: [TaskGateway],
    },
    {
      provide: UpdateTaskUseCase,
      useFactory: (gateway: TaskGateway) => new UpdateTaskUseCase(gateway),
      deps: [TaskGateway],
    },
  ],
});

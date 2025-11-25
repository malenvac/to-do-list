import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { TaskGateway } from './domain/models/task/gateway/task-gateway';
import { LocalStorageTaskGateway } from './infrastructure/local-storage-task-gateway';
import { CreateTaskUseCase } from './domain/usecases/create-task-usecase';
import { GetAllTaskUseCase } from './domain/usecases/get-all-tasks-usecase';
import { DeleteTaskUseCase } from './domain/usecases/delete-task-usecase';

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
  ],
});

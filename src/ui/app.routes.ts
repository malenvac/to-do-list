import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'create-task',
    loadComponent: () => import('./pages/create-task/create-task.page').then(m => m.CreateTaskPage)
  },
  {
    path: 'edit-task/:id',
    loadComponent: () => import('./pages/create-task/create-task.page').then(m => m.CreateTaskPage)
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.page').then(m => m.CategoriesPage)
  },
  {
    path: 'create-category',
    loadComponent: () => import('./pages/create-category/create-category.page').then(m => m.CreateCategoryPage)
  },
  {
    path: 'edit-category/:id',
    loadComponent: () => import('./pages/create-category/create-category.page').then(m => m.CreateCategoryPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

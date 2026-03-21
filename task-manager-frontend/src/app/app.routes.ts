import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/ register/register.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-task',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-task/:id',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/tasks'
  }
];
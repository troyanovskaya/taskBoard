import { Routes } from '@angular/router';
import { LogInPageComponent } from './components/log-in-page/log-in-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

export const routes: Routes = [
  { path: 'login', component: LogInPageComponent},
  { path: 'register', component: RegisterPageComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

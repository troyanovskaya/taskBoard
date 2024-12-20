import { Routes } from '@angular/router';
import { LogInPageComponent } from './components/log-in-page/log-in-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoggedUser } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LogInPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'main', component: MainPageComponent, canActivate: [LoggedUser]},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

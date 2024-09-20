import { Routes } from '@angular/router';
import { LogInPageComponent } from './components/log-in-page/log-in-page.component';

export const routes: Routes = [
  { path: '**', component: LogInPageComponent}
];

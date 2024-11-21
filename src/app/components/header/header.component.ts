import { Component, EventEmitter, inject } from '@angular/core';
import { CreateTeamComponent } from '../reusable/create-team/create-team.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CreateTeamComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  createTeamVisible:boolean = false;
  authService: AuthService = inject(AuthService);
  changeVisibility(state: boolean){
    this.createTeamVisible = state;
  }
  logout(){
    this.authService.logout();
  }
}

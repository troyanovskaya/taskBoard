import { Component, EventEmitter, inject } from '@angular/core';
import { CreateTeamComponent } from '../reusable/create-team/create-team.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService: AuthService = inject(AuthService);
  logout(){
    this.authService.logout();
  }
}

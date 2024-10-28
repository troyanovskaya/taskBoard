import { Component, EventEmitter } from '@angular/core';
import { CreateTeamComponent } from '../reusable/create-team/create-team.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CreateTeamComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  createTeamVisible:boolean = false;
  changeVisibility(state: boolean){
    this.createTeamVisible = state;
  }
}

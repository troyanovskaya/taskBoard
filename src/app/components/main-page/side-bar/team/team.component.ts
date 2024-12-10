import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Team } from '../../../../models/Team';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { TeamService } from '../../../../services/team.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
@Input() team?: Team;
@Output() closeSideBar:EventEmitter<boolean> = new EventEmitter<boolean>
teamService: TeamService = inject(TeamService);
authService: AuthService = inject(AuthService);
delete(){
  if(this.team && this.authService.user){
    this.teamService.removeTeam(this.team.id, this.authService.user.localId);
  }
}
setTeam(){
  if(this.team){
    this.teamService.setTeam(this.team.id);
    this.closeSideBar.emit(true);
  }
}
}

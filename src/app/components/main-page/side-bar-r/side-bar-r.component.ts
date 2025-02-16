import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Team } from '../../../models/Team';
import { AuthService } from '../../../services/auth.service';
import { TeamService } from '../../../services/team.service';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-side-bar-r',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar-r.component.html',
  styleUrl: './side-bar-r.component.scss'
})
export class SideBarRComponent {
  teamService: TeamService = inject(TeamService);
  taskService: TaskService = inject(TaskService);
  authService: AuthService = inject(AuthService);
  teams: Team[] = [];
  toOpen: boolean = false;
  createTeamVisible:boolean = false;
  ngOnInit(){
    this.teamService.teams.subscribe( el =>{
      this.teams = el;
    } )
    if(this.authService.user){
      this.teamService.getTeams(this.authService.user.localId)
    }
  }
  isOpen:boolean = false;
  changeVisibility(state: boolean){
    this.createTeamVisible = state;
  }
  open(){
    this.isOpen = !this.isOpen;
    if(this.isOpen){
      setTimeout( () =>{
        this.toOpen = true;
      }, 350)
    } else{
      this.toOpen = false;
    }
  }
}

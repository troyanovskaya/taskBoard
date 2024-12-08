import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { AuthService } from '../../../services/auth.service';
import { Team } from '../../../models/Team';
import { CreateTeamComponent } from '../../reusable/create-team/create-team.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, CreateTeamComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit{
  teamService: TeamService = inject(TeamService);
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

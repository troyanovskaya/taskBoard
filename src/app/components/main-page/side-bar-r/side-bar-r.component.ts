import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Team } from '../../../models/Team';
import { AuthService } from '../../../services/auth.service';
import { TeamService } from '../../../services/team.service';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/Task';
import { DataService } from '../../../services/data.service';
import { AddMemberComponent } from "../../reusable/add-member/add-member.component";

@Component({
  selector: 'app-side-bar-r',
  standalone: true,
  imports: [CommonModule, AddMemberComponent],
  templateUrl: './side-bar-r.component.html',
  styleUrl: './side-bar-r.component.scss'
})
export class SideBarRComponent {
  teamService: TeamService = inject(TeamService);
  taskService: TaskService = inject(TaskService);
  dataService: DataService = inject(DataService);
  authService: AuthService = inject(AuthService);
  @Output() visibility: EventEmitter<boolean> = new EventEmitter<boolean>;
  teams: Team[] = [];
  selectedTeam: string = '';
  toOpen: boolean = false;
  createTeamVisible:boolean = false;
  ngOnInit(){
    this.teamService.teams.subscribe( el =>{
      this.teams = el;
    } )
    this.teamService.selectedTeam.subscribe( el =>{
      this.selectedTeam = el;
    })
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
  setBoards(mate: {id:string, tasks:Task[], email:string}){
    this.taskService.setMateTasks(mate.tasks);
    this.dataService.selectedUser = mate;
    if(this.authService.user && this.selectedTeam){
      let team = this.teams.find( el =>{
        return el.id === this.selectedTeam;
      })
      if(team && team.adminId===this.authService.user.localId){
        this.dataService.changeRole('admin');
      } else{
        this.dataService.changeRole('mate');
      }
    }
    this.open();

  }
}

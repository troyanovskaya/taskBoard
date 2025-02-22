import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Team } from '../../../../models/Team';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { TeamService } from '../../../../services/team.service';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit, OnDestroy{

@Input() team?: Team;
@Output() closeSideBar:EventEmitter<boolean> = new EventEmitter<boolean>
teamService: TeamService = inject(TeamService);
taskService: TaskService = inject(TaskService);
authService: AuthService = inject(AuthService);
selectedTeam: string = '';
subscription?: Subscription;
ngOnInit(){
  this.subscription = this.teamService.selectedTeam.subscribe( el =>{
    this.selectedTeam = el;
  });

}
ngOnDestroy(){
  this.subscription?.unsubscribe();
}
delete(){
  if(this.team && this.authService.user){
    this.teamService.removeTeam(this.team.id, this.authService.user.localId);
    this.team = undefined;
  }
}
exit(){
  if(this.team && this.authService.user){
    this.team.members = this.team.members.filter( el=>{
      return el!= this.authService.user?.localId
    })
    this.teamService.updateTeam(this.team).subscribe();
    this.teamService.getTeams(this.authService.user.localId);
    this.team = undefined;
  }
}
setTeam(){
  if(this.team){
    this.teamService.setTeam(this.team.id);
    this.taskService.clearMates();
    let id = this.authService.user?.localId;
    this.team.members.forEach( el =>{
      if(el!==id){
        this.taskService.getTeamMatesTask(el);
      }
    });
    this.closeSideBar.emit(true);
  }

}
}

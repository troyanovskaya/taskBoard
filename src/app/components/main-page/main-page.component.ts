import { Component, inject, OnInit } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateTeamComponent } from '../reusable/create-team/create-team.component';
import { DialogComponent } from '../reusable/dialog/dialog.component';
import { TeamService } from '../../services/team.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [BoardComponent, DialogComponent, CommonModule, DragDropModule, CreateTeamComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  teamService: TeamService = inject(TeamService);
  authService:AuthService = inject(AuthService);
  ngOnInit() {
    this.authService.getUser();
    // this.teamService.getTeams(this.authService.user?.localId || '').subscribe( els =>{
    //   console.log(els);
    // })
  }


  lists = [
    {title: 'To do', id: 'list-1', tasks:['Task1 gfdsefsds sedfesef sdfdfdfd dfdf dfdf dfdf dfd dfdd fdfd fdgdf', 'Task2', 'Task3', 'Task4', 'Task5', 'Task6'], connectedTo: ['list-2, list-3']},
    {title: 'In process', id: 'list-2', tasks:['Task1', 'Task2', 'Task3', 'Task4', 'Task5', 'Task6'], connectedTo: ['list-1, list-3']},
    {title: 'Done', id: 'list-3', tasks:['Task1', 'Task2', 'Task3', 'Task4', 'Task5', 'Task6'], connectedTo: ['list-2, list-1']},
]
click(){
  console.log(this.lists)
}
arrayChanged(){

}

}

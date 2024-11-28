import { Component, inject, OnInit } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateTeamComponent } from '../reusable/create-team/create-team.component';
import { DialogComponent } from '../reusable/dialog/dialog.component';
import { TeamService } from '../../services/team.service';
import { AuthService } from '../../services/auth.service';
import { Board } from '../../models/Board';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [BoardComponent, CommonModule, DragDropModule],
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


  boards: Board[] = [
    {title: 'To do', ref:'do', id: 'list-1', tasks:[], connectedTo: ['list-2, list-3']},
    {title: 'In process', ref:'progress', id: 'list-2', tasks:[], connectedTo: ['list-1, list-3']},
    {title: 'Done', ref:'done', id: 'list-3', tasks:[], connectedTo: ['list-2, list-1']},
]
click(){
  console.log(this.boards)
}
arrayChanged(){

}

}

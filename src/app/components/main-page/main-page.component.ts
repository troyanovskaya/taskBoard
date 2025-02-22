import { Component, inject, OnInit } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateTeamComponent } from '../reusable/create-team/create-team.component';
import { DialogComponent } from '../reusable/dialog/dialog.component';
import { TeamService } from '../../services/team.service';
import { AuthService } from '../../services/auth.service';
import { Board } from '../../models/Board';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import {SideBarComponent} from './side-bar/side-bar.component'
import { SideBarRComponent } from './side-bar-r/side-bar-r.component';
import { AddMemberComponent } from "../reusable/add-member/add-member.component";
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [BoardComponent, CommonModule, DragDropModule,
    SideBarComponent, SideBarRComponent, AddMemberComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  teamService: TeamService = inject(TeamService);
  taskService:TaskService = inject(TaskService);
  authService:AuthService = inject(AuthService);
  visible:boolean = false;
  boards: Board[] = [];
  ngOnInit() {
    this.authService.getUser();
    this.taskService.tasks.subscribe( data =>{
      this.setBoards(data);
    })

    if(this.authService.user){
      this.taskService.getUserTasks(this.authService.user.localId);
    }
  }
  openAddMember(state:boolean){
    this.visible = state;
  }
  setBoards(data: Task[]){
    let Do:Task[] = [];
    let Progress:Task[] = [];
    let Done:Task[] = [];
    data.forEach(el =>{
      switch (el.status){
        case 'do':
          Do.push(el);
          break;
        case 'progress':
          Progress.push(el);
          break;
        case 'done':
          Done.push(el);
          break;
      }
    })
    Do = Do.sort( (a, b) =>{
      return a.num - b.num;
    })
    Progress = Progress.sort( (a, b) =>{
      return a.num - b.num;
    })
    Done = Done.sort( (a, b) =>{
      return a.num - b.num;
    })
    this.boards = [];
    this.boards.push(
      {title: 'To do', ref:'do', id: 'list-1', tasks: Do, connectedTo: ['list-2, list-3']},
      {title: 'In process', ref:'progress', id: 'list-2', tasks: Progress, connectedTo: ['list-1, list-3']},
      {title: 'Done', ref:'done', id: 'list-3', tasks: Done, connectedTo: ['list-2, list-1']})
  
  }

arrayChanged(){
  this.boards.forEach( board =>{
    board.tasks.forEach( (task, indx) =>{
      if ((task.status !== board.ref) && task.id){
        this.taskService.updateTask(task.id, {"status": board.ref, "num": indx}).subscribe();
      } else if( (task.num !== indx)  && task.id){
        this.taskService.updateTask(task.id, {"num": indx}).subscribe();
      }
    })
  })
}

}

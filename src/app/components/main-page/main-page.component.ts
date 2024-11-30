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
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [BoardComponent, CommonModule, DragDropModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  teamService: TeamService = inject(TeamService);
  taskService:TaskService = inject(TaskService);
  authService:AuthService = inject(AuthService);
  boards: Board[] = [];
  ngOnInit() {
    this.authService.getUser();
    if(this.authService.user){
      this.taskService.getUserTasks(this.authService.user.localId).subscribe(data =>{
        const Do:Task[] = [];
        const Progress:Task[] = [];
        const Done:Task[] = [];
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
        this.boards.push(
          {title: 'To do', ref:'do', id: 'list-1', tasks: Do, connectedTo: ['list-2, list-3']},
          {title: 'In process', ref:'progress', id: 'list-2', tasks: Progress, connectedTo: ['list-1, list-3']},
          {title: 'Done', ref:'done', id: 'list-3', tasks: Done, connectedTo: ['list-2, list-1']})
      })
    }

    // this.teamService.getTeams(this.authService.user?.localId || '').subscribe( els =>{
    //   console.log(els);
    // })
  }



click(){
  console.log(this.boards)
}
arrayChanged(){
  this.boards.forEach( board =>{
    board.tasks.forEach( task =>{
      if ((task.status !== board.ref) && task.id){
        this.taskService.updateTask(task.id, {"status": board.ref})
      }
    })
  })
}

}

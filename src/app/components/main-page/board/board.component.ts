import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,

} from '@angular/cdk/drag-drop';
import { TaskComponent } from './task/task.component';
import { List, Task } from '../../../models/Task';
import { Team } from '../../../models/Team';
import { TeamService } from '../../../services/team.service';
import { DataService } from '../../../services/data.service';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, CdkDropList, CdkDrag, TaskComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit{
  teams: Team[] = [];
  @Input() title: string ='';
  @Input() tasks: Task[] = [];
  @Input() type?: List;
  @Input () connectedTo: string[] = [];
  @Input() id?: string;
  @Output() arrayChanged: EventEmitter<boolean> = new EventEmitter<boolean>;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  teamService:TeamService = inject(TeamService);
  dataService: DataService = inject(DataService);
  disableDrag:boolean = false;
  selectedTeam: string = '';
  mode$ =  this.dataService.mode;
  mode: 'user' | 'mate' | 'admin' = 'user';
  ngOnInit(): void {
    // setInterval( () => {
    //   console.log(this.mode$)
    // }, 1000)
    //this.disableDrag = true;
    this.teamService.teams.subscribe( el =>{
      this.teams = el;
    } )
    this.teamService.selectedTeam.subscribe( data =>{
      this.selectedTeam = data;
    })

    // this.dataService.mode.subscribe( data =>{
    //   this.mode = data;
    //   this.disableDrag = true;
    //   this.cdr.detectChanges();
    //   this.dragDisabled(true);
    //   // if(data === 'user'){
    //   //   this.disableDrag = false;
    //   // } else{
    //   //   this.disableDrag = true;
    //   // }
    //   console.log(this.disableDrag)
    // })
  }
  drop(event: CdkDragDrop<Task[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.arrayChanged.emit(true);
  }
  createTask(){
    if(this.selectedTeam){
      this.tasks.push(new Task(this.type, this.tasks.length, this.selectedTeam))
    }

  }
  onTaskDeleted(id:string){
    this.tasks = this.tasks.filter(el =>{
     return  el.id != id;
    })

  }
  dragDisabled(flag: boolean){
    setTimeout(() => {
      this.disableDrag = flag;
      this.cdr.detectChanges();
    });


  }
}

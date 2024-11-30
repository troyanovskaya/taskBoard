import { Component, EventEmitter, inject, Input, NgModule, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Task } from '../../../../models/Task';
import { FormsModule, NgModel } from '@angular/forms';
import { TaskService } from '../../../../services/task.service';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit{
  ngOnInit(): void {
    if (!this.task?.task){
      this.edit();
 
    } else{
      this.message = this.task?.task;
    }
  }
  message:string = '';
  @Input() task?:Task;
  @Output() dragDisabled: EventEmitter<boolean> = new EventEmitter<boolean>;
  onEditMode:boolean = false;
  taskService: TaskService = inject(TaskService);
  authService:AuthService = inject(AuthService);
  
  edit(){
    this.onEditMode = !this.onEditMode;
    if(this.onEditMode){

      // this.dragDisabled.emit(true);

    } else if(this.task && this.authService.user?.localId){

      this.task?.setValues(this.authService.user?.localId, this.authService.user?.localId, this.message);
      console.log(this.message);
      this.taskService.createTask(this.task);
      // this.dragDisabled.emit(false);
    }

  }
  delete(){
    console.log('bin')
  }
}

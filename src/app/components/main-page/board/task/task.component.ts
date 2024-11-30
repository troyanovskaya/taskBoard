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
  message:string = '';
  @Input() task?:Task;
  @Output() dragDisabled: EventEmitter<boolean> = new EventEmitter<boolean>;
  @Output() taskDeleted: EventEmitter<string> = new EventEmitter<string>;
  onEditMode:boolean = false;
  taskService: TaskService = inject(TaskService);
  authService:AuthService = inject(AuthService);
  ngOnInit(){
    if (!this.task?.task) {
      this.onEditMode = true; // Set edit mode without triggering the method
      this.dragDisabled.emit(this.onEditMode); 
    } else {
      this.message = this.task?.task;
    }
  }

  
  edit() {
    this.onEditMode = !this.onEditMode;
    this.dragDisabled.emit(this.onEditMode);  
    if (!this.onEditMode && this.task && this.authService.user?.localId) {
      this.task.setValues(
        this.authService.user?.localId,
        this.authService.user?.localId,
        this.message
      );  
      this.taskService.createTask(this.task).subscribe((el) => {
        setTimeout(() => {
          if (this.task) {
            this.task.setId(el.id);
          }
        });
      });
    }
  }
  delete(){
    if(this.task?.id){
      this.taskService.deleteTask(this.task.id).subscribe( data =>{
        console.log(data);
        if(this.task?.id){
          this.taskDeleted.emit(this.task.id);
        }

    });
    }

    console.log('bin')
  }
}

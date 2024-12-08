import { Component, EventEmitter, inject, Input, NgModule, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Task } from '../../../../models/Task';
import { FormsModule, NgModel } from '@angular/forms';
import { TaskService } from '../../../../services/task.service';
import { AuthService } from '../../../../services/auth.service';
import { NotificationComponent } from '../../../reusable/notification/notification.component';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule, NotificationComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit{
  message:string = '';
  editError: string = 'Task should be at least 3 characters long!'
  @Input() task?:Task;
  @Output() dragDisabled: EventEmitter<boolean> = new EventEmitter<boolean>;
  @Output() taskDeleted: EventEmitter<string> = new EventEmitter<string>;
  @ViewChild(NotificationComponent) notification?: NotificationComponent;
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
  showNotification(message:string, type:string){
    if(!message){
      return false;
    } else{
      if(this.notification){
        this.notification.setValues(message, type);
        this.notification.show(); 
      }
      return true;
    }    
  }
  hasError: boolean = false;

  triggerError() {
    this.hasError = true; // Apply the error border
    setTimeout(() => {
      this.hasError = false; // Remove the error border after 2 seconds
    }, 2000);
  }
  checkIfCanEdit(){
    if(this.message.length <4 && this.onEditMode){
      return false;
    }
    return true;
  }
  edit() {
    if(this.checkIfCanEdit()){
      this.onEditMode = !this.onEditMode;
      this.dragDisabled.emit(this.onEditMode); 
      if (!this.onEditMode && this.task && this.authService.user?.localId) {
        if(this.task.id){
          this.taskService.updateTask(this.task.id, {task: this.message}).subscribe( data =>{
            if(this.task){
              this.task.task = this.message;
            }
        });
        } else{
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
    } else{
      this.triggerError();
      this.showNotification(this.editError, 'error');
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

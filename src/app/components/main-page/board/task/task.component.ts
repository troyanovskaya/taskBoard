import { Component, EventEmitter, Input, Output } from '@angular/core';
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
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, DragDropModule, CdkDrag],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task?:string;
  @Input() tasks?:string[];
  @Output() dragDisabled: EventEmitter<boolean> = new EventEmitter<boolean>;
  onEditMode:boolean = false;
  edit(){
    this.onEditMode = !this.onEditMode;
    if(this.onEditMode){
      this.dragDisabled.emit(true);
    } else{
      this.dragDisabled.emit(false);
    }
    console.log(this.tasks);
  }
  delete(){
    console.log('bin')
  }
}

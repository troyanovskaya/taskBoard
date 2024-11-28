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
import { TaskComponent } from './task/task.component';
import { List, Task } from '../../../models/Task';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, CdkDropList, CdkDrag, TaskComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  @Input() title: string ='';
  @Input() tasks: Task[] = [];
  @Input() type?: List;
  @Input () connectedTo: string[] = [];
  @Input() id?: string;
  @Output() arrayChanged: EventEmitter<boolean> = new EventEmitter<boolean>;
  disableDrag:boolean = false;
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
    this.tasks.push(new Task('1', '1', '', this.type))
  }
}

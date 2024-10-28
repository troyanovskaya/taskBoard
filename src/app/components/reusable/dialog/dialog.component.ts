import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() message:string = '';
  @Input() title:string = '';
  @Output() answer: EventEmitter<boolean> = new EventEmitter<boolean>;
  emitAnswer(res:boolean){
    this.answer.emit(res);
  }
}

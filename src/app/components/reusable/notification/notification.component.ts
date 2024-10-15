import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit{
message: string = '';
  duration: number = 2000; // Duration in milliseconds
  visible: boolean = false;
  type:string = '';
  setValues(message:string, type:string, duration = 2000){
    this.message = message;
    this.type = type;
    this.duration = duration;
  }

  ngOnInit() {
    if (this.message) {
      this.show();
    }
  }

  show() {
    if(this.message && this.type && this.duration){
      this.visible = true;
      setTimeout(() => {
        this.hide();
      }, this.duration);
    }
  }

  hide() {
    this.visible = false;
  }
}

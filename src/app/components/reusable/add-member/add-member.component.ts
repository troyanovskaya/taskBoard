import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Team } from '../../../models/Team';
import { AuthService } from '../../../services/auth.service';
import { TeamService } from '../../../services/team.service';
import { DialogComponent } from '../dialog/dialog.component';
import { LoaderComponent } from '../loader/loader.component';
import { NotificationComponent } from '../notification/notification.component';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatInputModule, FormsModule, 
  ReactiveFormsModule, CommonModule, LoaderComponent, NotificationComponent],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.scss'
})
export class AddMemberComponent implements OnInit{
  members: {email: string, id: string}[] = [];
  team:string = '';
  ngOnInit(): void {
    this.teamService.selectedTeam.subscribe(data =>{
      this.team = data;
    })
  }
  @Input() visible: boolean = false;
  @Output() visibility: EventEmitter<boolean> = new EventEmitter<boolean>;
  @ViewChild(NotificationComponent) notification?: NotificationComponent;
  isLoading:boolean = false;
  notificationMessage: string = '';
  authService:AuthService = inject(AuthService);
  closeWindow(){
    this.visibility.emit(false);
    this.resetAllForms()
  }
  teamService: TeamService = inject(TeamService);
  taskService: TaskService = inject(TaskService);

  member = new FormControl('', [Validators.required, Validators.email]);
  resetAllForms(){
    this.member.reset();
    this.member.setErrors(null);
    this.members.splice(1);
  }

  addMember(){
    if(this.member.errors === null && this.member.value!==null){
      this.authService.email(this.member.value).subscribe( data =>{
        if(data.exist && data.email && data.id && this.team){
          const res = this.taskService.mates.filter( el =>{
            return el.email === data.email
          })
          if(res.length===0){
            this.teamService.getTeam(this.team).subscribe( team =>{
              console.log('team: ', team)
              if(team && data.id){
                team.members.push(data.id);
                this.teamService.updateTeam(team).subscribe((data)=>{
                  if(this.authService.user){
                    this.visible = false;
                    this.teamService.getTeams(this.authService.user.localId);
                    this.taskService.getTeamMatesTask(data.id);
                    this.visibility.emit(false);
                  }
                });
              }
            })
          } else{
            this.openNotification('This user is already part of the team', 'error');
          }

          
        } else{
          this.openNotification('Sorry, this user is not registered yet.', 'error');
        }
      });

    } else{
      this.openNotification('Please, enter the valid email address.', 'error'); 
    }

  }
  readonly dialog = inject(MatDialog);
  openNotification(message: string, type: string){
    if(this.notification){
      this.notification.setValues(message, type)
      this.notification.show(); 
    }
  }

}

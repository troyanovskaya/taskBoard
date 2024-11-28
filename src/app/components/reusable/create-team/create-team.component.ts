import { Component, EventEmitter, inject, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TeamService } from '../../../services/team.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Team } from '../../../models/Team';
import { LoaderComponent } from '../loader/loader.component';
import { NotificationComponent } from '../notification/notification.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatInputModule, FormsModule, 
    ReactiveFormsModule, CommonModule, LoaderComponent, NotificationComponent],
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.scss'
})
export class CreateTeamComponent{
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
  dialogMessage:string = "Are you sure you don't want to add any members tot he team?";
  dialogTitle:string = 'Team members';
  teamService: TeamService = inject(TeamService);
  memberEmails: string[] = [];
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)])
  })
  member = new FormControl('', [Validators.required, Validators.email]);
  resetAllForms(){
    this.form.reset();
    this.member.reset();
    this.form.controls.name.setErrors(null);
    this.form.controls.description.setErrors(null);
    this.member.setErrors(null);
    this.memberEmails = [];
  }
  addTeam(){
    // if(this.form.value.description && this.form.value.name){
    //   console.log(this.authService.user)
    //   // const team:Team = {adminId: this.authService.user?.localId || '1', members: [{userId: this.authService.user?.localId || '1', board: {todo: [], process: [], done:[]}}], 
    //   //   description: this.form.value.description?.split('\n'), 
    //   //   name: this.form.value.name};
    //   this.isLoading = true;
    //   let subscription = this.teamService.addTeam(team).subscribe({
    //     next: (res) =>{
    //       console.log(res);
    //       this.isLoading = false;
    //       this.resetAllForms();
    //       this.closeWindow();
    //     },
    //     error: (err) =>{
    //       console.log(err);
    //       if(this.notification){
    //         this.notification.setValues('An unknown error has occured', 'error')
    //         this.notification.show(); 
    //       }
    //       this.isLoading = false;
    //     }
    //   })
    // }

  }
  submitTeam(){
    if(this.form.valid){
      if(this.memberEmails.length===0){
        this.openDialog('500ms', '500ms');
      } else{
        this.addTeam();
      }
    }else{
      this.updateDescriptionErrorMessage();
      this.updateNameErrorMessage();
    }
  }
  addMember(){
    if(this.member.errors === null && this.member.value!==null){
      this.memberEmails.push(this.member.value);
      // this.authService.checkIfEmailExist(this.member.value);
      console.log(this.memberEmails);
      this.member.reset();
      this.member.setErrors(null);
    } else{
      console.log(this.member)  
    }

  }
  errorNameMessage = signal('');
  updateNameErrorMessage() {
    if (this.form.controls.name.hasError('required')) {
      this.errorNameMessage.set('You must enter a value');
    } else if (this.form.controls.name.hasError('minlength')) {
      this.errorNameMessage.set('Name should be at least 3 characters long');
    } else {
      this.errorNameMessage.set('');
    }
  }
  errorDescriptionMessage = signal('');
  updateDescriptionErrorMessage() {
    if (this.form.controls.description.hasError('required')) {
      this.errorDescriptionMessage.set('You must enter a value');
    } else if (this.form.controls.description.hasError('minlength')) {
      this.errorDescriptionMessage.set('Description should be at least 10 characters long');
    } else {
      this.errorDescriptionMessage.set('');
    }
  }
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.componentInstance.message = this.dialogMessage
    dialogRef.componentInstance.title = this.dialogTitle;
    dialogRef.componentInstance.answer.subscribe( el =>{
      if(el){
        this.addTeam();
      } else{
        this.updateDescriptionErrorMessage();
        this.updateNameErrorMessage();
      }
    })
  }
}

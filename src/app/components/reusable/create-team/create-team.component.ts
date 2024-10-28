import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TeamService } from '../../../services/team.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Team } from '../../../models/Team';
@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatInputModule, FormsModule, 
    ReactiveFormsModule, CommonModule, DialogComponent],
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.scss'
})
export class CreateTeamComponent {
  @Input() visible: boolean = false;
  @Output() visibility: EventEmitter<boolean> = new EventEmitter<boolean>;
  closeWindow(){
    this.visibility.emit(false);
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
  addTeam(){
    if(this.form.value.description && this.form.value.name){
      const team:Team = {adminId: '1', members: this.memberEmails, 
        description: this.form.value.description?.split('\n'), 
        name: this.form.value.name};
      this.teamService.addTeam(team);
    }

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
      console.log(this.memberEmails);
      this.member.reset();
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

import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {merge} from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password1: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  hide = signal(true);
  hide1 = signal(true);
  errorEmailMessage = signal('');
  errorPasswordMessage = signal('');
  errorPassword1Message = signal('');

  constructor() {
    merge(this.form.controls.email.statusChanges, this.form.controls.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());
    merge(this.form.controls.password.statusChanges, this.form.controls.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  updateEmailErrorMessage() {
    if (this.form.controls.email.hasError('required')) {
      this.errorEmailMessage.set('You must enter a value');
    } else if (this.form.controls.email.hasError('email')) {
      this.errorEmailMessage.set('Not a valid email');
    } else {
      this.errorEmailMessage.set('');
    }
  }
  updatePasswordErrorMessage(){
    if (this.form.controls.password.hasError('required')) {
      this.errorPasswordMessage.set('You must enter a value');
    } else if (this.form.controls.password.hasError('minLength')) {
      this.errorPasswordMessage.set('Value should not be less then 8 characters long');
    } else {
      this.errorPasswordMessage.set('');
    }
  }

  clickEvent(event: MouseEvent, index:number = 0) {
    if(!index){
      this.hide.set(!this.hide());
    } else{
      this.hide1.set(!this.hide());
    }

    event.stopPropagation();
  }
  onSubmit(valid:boolean){
    if(valid){
      console.log(this.form.value)
    } else{
      this.updateEmailErrorMessage();
      this.updatePasswordErrorMessage();
    }

  }
}

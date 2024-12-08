import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {merge, Subscription} from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoaderComponent } from '../reusable/loader/loader.component';
import { ErrorsService } from '../../services/errors.service';
import { NotificationComponent } from '../reusable/notification/notification.component';
import {Router, RouterModule} from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, 
    ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule, 
    LoaderComponent, NotificationComponent, RouterModule],

  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent implements OnDestroy, OnInit {
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
  authService:AuthService = inject(AuthService);
  errorsService: ErrorsService = inject(ErrorsService)
  isLoading: boolean = false;
  notificationMessage:string = '';
  @ViewChild(NotificationComponent) notification?: NotificationComponent;
  router: Router = inject(Router);
  subscription?: Subscription;
  constructor() {
    merge(this.form.controls.email.statusChanges, this.form.controls.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());
    merge(this.form.controls.password.statusChanges, this.form.controls.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }
  ngOnInit(){
    this.authService.getUser();
    if(this.authService.user){
      this.router.navigate(['/main']);
    }
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
    } else if (this.form.controls.password.hasError('minlength')) {
      this.errorPasswordMessage.set('Value should not be less then 8 characters long');
    } else {
      this.errorPasswordMessage.set('');
    }
  }

  clickEvent(event: MouseEvent, index:number = 0) {
    if(!index){
      this.hide.set(!this.hide());
    } else{
      this.hide1.set(!this.hide1());
    }

    event.stopPropagation();
  }
  showNotification(message:string, type:string){
    if(!message){
      return false;
    } else{
      this.notificationMessage = message;
      this.isLoading = false;
      if(this.notification){
        this.notification.setValues(this.notificationMessage, type);
        this.notification.show(); 
      }
      return true;
    }    
  }
  onSubmit(valid:boolean){
    if(valid && this.form.value.email && this.form.value.password){
      this.isLoading = true;
      console.log('router1')
      this.subscription = this.authService.register(this.form.value.email, this.form.value.password)
      .subscribe({
        next: (res) => {
        console.log('router2')
        this.isLoading = false;

        this.router.navigate(['/login']);
      }, 
        error: (err) => {
          this.notificationMessage = '';
          console.log(err)
          this.isLoading = false;
          this.showNotification(err.error.error, 'error');
        }})
      
    } else{
      this.updateEmailErrorMessage();
      this.updatePasswordErrorMessage();
    }

  }
}

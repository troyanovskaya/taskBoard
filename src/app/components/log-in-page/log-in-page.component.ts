import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {merge, Observable, Subscription} from 'rxjs';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router'
import { NotificationComponent } from "../reusable/notification/notification.component";
import { LoaderComponent } from "../reusable/loader/loader.component";
import { AuthService } from '../../services/auth.service';
import { ErrorsService } from '../../services/errors.service';
import { AuthResponse } from '../../models/AuthResponse';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, 
    ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule, 
    RouterModule, NotificationComponent, LoaderComponent, AngularFireModule,
    AngularFireDatabaseModule],
  templateUrl: './log-in-page.component.html',
  styleUrl: './log-in-page.component.scss'
})
export class LogInPageComponent implements OnDestroy, OnInit{
  form = new FormGroup({
    email: new FormControl('q@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('11111111', [Validators.required, Validators.minLength(8)])
  })
  hide = signal(true);
  errorEmailMessage = signal('');
  errorPasswordMessage = signal('');
  authService:AuthService = inject(AuthService);
  errorsService: ErrorsService = inject(ErrorsService)
  isLoading: boolean = false;
  notificationMessage:string = '';
  @ViewChild(NotificationComponent) notification?: NotificationComponent;
  // authObs?: Observable<AuthResponse>;
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
  ngOnInit(){
    this.authService.getUser();
    if(this.authService.user){
      this.router.navigate(['/main']);
    }
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe();
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

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  showNotification(message:string, type:string){
    console.log('message: ', message)
    if(!message){
      message = 'An unknown error has occured. Please, try again later'
    } 
      this.notificationMessage = message;
      this.isLoading = false;
      if(this.notification){
        this.notification.setValues(this.notificationMessage, type);
        this.notification.show(); 
    }
      
  }
  onSubmit(valid:boolean){
    if(valid && this.form.value.email && this.form.value.password){
      this.isLoading = true;
      this.subscription = this.authService.login(this.form.value.email, this.form.value.password)
      .subscribe({
        next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/main']);
      }, 
        error: (err) => {
          this.notificationMessage = '';
          this.isLoading = false;
          console.log(err)
          this.showNotification(err.error.error, 'error');
        }})
    } else{
      this.updateEmailErrorMessage();
      this.updatePasswordErrorMessage();
    }

  }
}

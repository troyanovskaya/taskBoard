import { Injectable } from '@angular/core';
import { Error } from '../models/Error';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  errors: Error[] = [
    {error: 'EMAIL_EXISTS', message: 'The email address is already in use by another account.'},
    {error: 'OPERATION_NOT_ALLOWED', message: 'Password sign-in is disabled for this project.'},
    {error: 'TOO_MANY_ATTEMPTS_TRY_LATER', message: 'We have blocked all requests from this device due to unusual activity. Try again later.'},
  ]
  constructor() { }
}

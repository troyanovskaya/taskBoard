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
    {error: 'EMAIL_NOT_FOUND', message: 'There is no user record corresponding to this identifier. The user may have been deleted.'},
    {error: 'INVALID_PASSWORD', message: 'The password is invalid or the user does not have a password.'},
    {error: 'USER_DISABLED', message: 'The user account has been disabled by an administrator.'},
    {error: 'INVALID_LOGIN_CREDENTIALS', message: 'The password or email is invalid'}
  ]
  constructor() { }
}

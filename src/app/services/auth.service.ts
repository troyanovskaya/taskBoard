import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../models/AuthResponse';
import { Subject, tap } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http:HttpClient = inject(HttpClient);
  user = new Subject<User>();
  registerUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAM82XcacqdPNT5p4AGJ8rm7yQA5wnfIJA';
  loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAM82XcacqdPNT5p4AGJ8rm7yQA5wnfIJA';
  handleUser(res:AuthResponse){
    const expiresTs = new Date().getTime() + +res.expiresIn*1000;
    const expires = new Date(expiresTs);
    const user = new User(res.email, res.localId, res.idToken, expires);
    this.user.next(user);
  }
  register(email:string, password:string){
    const data = { email: email.trim(), password: password.trim(), returnSecureToken: true};
    return this.http.post<AuthResponse>(this.registerUrl, data)
            .pipe(tap( (res) =>{
              this.handleUser(res);
            }));
  }
  login(email:string, password:string){
    const data = { email: email.trim(), password: password.trim(), returnSecureToken: true};
    return this.http.post<AuthResponse>(this.loginUrl, data)
          .pipe(tap( (res) =>{
            this.handleUser(res);
          }));
  }
  constructor() { }
}

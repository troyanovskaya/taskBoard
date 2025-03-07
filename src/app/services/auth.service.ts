import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../models/AuthResponse';
import { map, Subject, tap } from 'rxjs';
import { User } from '../models/User';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http:HttpClient = inject(HttpClient);
  dataService:DataService = inject(DataService);
  router: Router = inject(Router);
  user?:User | null;
  getUser(){
    if(!this.user){
      const user = localStorage.getItem('user');
      if(user){
        this.user = JSON.parse(user);
        this.dataService.changeRole('user');
      }
    }
  }
  handleUser(res:AuthResponse){
    const expiresTs = new Date().getTime() + +res.expiresIn*1000;
    const expires = new Date(expiresTs);
    const user = new User(res.displayName, res.email, res.localId, res.idToken, res.refreshToken, expires);
    this.user = user;
    this.dataService.changeRole('user');
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }
  register(email:string, password:string){
    const data = { email: email.trim(), password: password.trim(), login: 'Ann', returnSecureToken: true};
    return this.http.post<AuthResponse>(`${this.dataService.url}/user/register`, data).pipe(
      map(() => ({ success: true })) // Emit a value explicitly
    );
  }
  login(email:string, password:string){
    const data = { email: email.trim(), password: password.trim(), returnSecureToken: true};
    return this.http.post<AuthResponse>(`${this.dataService.url}/user/login`, data)
          .pipe(tap( (res) =>{
            this.handleUser(res);
          }));
  }
  email(email:string){
    return this.http.post<{exist:string, email:string | null, id:string | null}>(`${this.dataService.url}/user/email`, {email})
  }
  logout(){
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/login']);
  }
  constructor() { }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http:HttpClient = inject(HttpClient);
  url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAM82XcacqdPNT5p4AGJ8rm7yQA5wnfIJA'
  register(email:string, password:string){
    const data = { email: email, password: password, returnSecureToken: true}
    return this.http.post<AuthResponse>(this.url, data);
  }
  constructor() { }
}

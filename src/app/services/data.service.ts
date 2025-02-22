import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //url:string = 'http://localhost:3000';
  url:string = 'https://us-central1-taskboard-eb7da.cloudfunctions.net/api';
  mode: BehaviorSubject<'user' | 'mate' | 'admin'> = new BehaviorSubject<'user' | 'mate' | 'admin'>('user');
  selectedUser?: {id:string, tasks:Task[], email:string};
  changeRole(role: 'user' |  'mate' | 'admin'){
    console.log(role);
    this.mode.next(role);

  }
  constructor() { }
}

import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Task } from '../models/Task';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  dataService:DataService = inject(DataService);
  http:HttpClient = inject(HttpClient);
  tasks: Subject<Task[]> = new Subject<Task[]>();
  mates :{email:string, tasks: Task[]}[] = [];
  createTask(task:Task){
      return this.http.post<{id: string}>(`${this.dataService.url}/tasks`, task)
    
  }
  getUserTasks(id:string){
    this.http.get<Task[]>(`${this.dataService.url}/tasks/user/${id}`).
    subscribe( data =>{
      this.tasks.next(data);
    })
  }
  getTeamMatesTask(userId:string){
    this.http.post<{email:string, tasks: Task[]}[]>(`${this.dataService.url}/user/id`, {userId}).
    subscribe( data =>{
      this.mates.push(...data);
    })
  }
  clearMates(){
    this.mates = [];
  }
  updateTask(id:string, task:any){
    return this.http.patch<{message: string}>(`${this.dataService.url}/tasks/${id}`, task)
  }
  deleteTask(id:string){
    return this.http.delete<string>(`${this.dataService.url}/tasks/${id}`)
  }
  constructor() { }
}

import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Task } from '../models/Task';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  dataService:DataService = inject(DataService);
  http:HttpClient = inject(HttpClient);
  createTask(task:Task){
      return this.http.post<{id: string}>(`${this.dataService.url}/tasks`, task)
    
  }
  getUserTasks(id:string){
    return this.http.get<Task[]>(`${this.dataService.url}/tasks/user/${id}`);
  }
  updateTask(id:string, task:any){
    return this.http.patch<string>(`${this.dataService.url}/tasks/${id}`, task).subscribe( data =>{
      console.log(data);
  });
  }
  deleteTask(id:string){
    return this.http.delete<string>(`${this.dataService.url}/tasks/${id}`)
  }
  constructor() { }
}

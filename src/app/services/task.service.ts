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
    if(!task.id){
      this.http.post<string>(`${this.dataService.url}/tasks`, task).subscribe( data =>{
        console.log(data);
      })
      // console.log(task);

    }
    
  }
  getUserTasks(id:string){
    return this.http.get<Task[]>(`${this.dataService.url}/tasks/user/${id}`);
  }
  updateTask(id:string, task:any){
    return this.http.patch<string>(`${this.dataService.url}/tasks/${id}`, task).subscribe( data =>{
      console.log(data);
  });
  }

  constructor() { }
}

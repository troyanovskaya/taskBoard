import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Task } from '../models/Task';
import { HttpClient } from '@angular/common/http';

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

  constructor() { }
}

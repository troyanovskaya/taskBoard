import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Team } from '../models/Team';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  http:HttpClient = inject(HttpClient);
  dataService: DataService = inject(DataService);
  taskService: TaskService = inject(TaskService);
  teams: Subject<Team[]> = new Subject<Team[]>();
  errorAdding: Subject<boolean> = new Subject<boolean> ;
  selectedTeam: BehaviorSubject<string> = new BehaviorSubject('0');
  setTeam(teamId:string | undefined){
    if(teamId){
      this.selectedTeam.next(teamId);
    }

  }
  addTeam(team:Team){
    this.http.post<Team>(`${this.dataService.url}/teams`, team).subscribe( {next: () =>{
      this.getTeams(team.adminId);
    },
    error: (err) =>{
      this.errorAdding.next(true);
    //console.log(err);
    }  
  })
  }
  getTeams(id:string){
    this.http.get<Team[]>(`${this.dataService.url}/teams/user/${id}`).
    subscribe( {next: (data) =>{
      this.teams.next(data);
      if(data[0].id){
        this.setTeam(data[0].id);
        this.taskService.clearMates();
      }
    }, 
    error: (err) =>{
      this.errorAdding.next(true);
    //console.log(err);
    }    
  })
  }
  removeTeam(id:string | undefined, userId:string){
    if(id){
      this.http.delete<any>(`${this.dataService.url}/teams/${id}`).subscribe(()=>{
        this.getTeams(userId);
      });
    }
    
  }
  updateTeam(team:Team){
    return this.http.patch<any>(`${this.dataService.url}/teams/${team.id}`, team)
  }
  getTeam(teamId:string){
    return this.http.get<Team>(`${this.dataService.url}/teams/${teamId}`); 
  }
  // constructor(private db: AngularFireDatabase){}
}

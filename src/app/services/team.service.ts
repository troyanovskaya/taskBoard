import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Team } from '../models/Team';
import { map, Observable, Subject } from 'rxjs';
import { DataService } from './data.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  http:HttpClient = inject(HttpClient);
  dataService: DataService = inject(DataService);
  teams: Subject<Team[]> = new Subject<Team[]>();
  errorAdding: Subject<boolean> = new Subject<boolean> ;
  selectedTeam: Subject<string> = new Subject<string>;
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
  // constructor(private db: AngularFireDatabase){}
}

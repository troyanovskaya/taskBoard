import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Team } from '../models/Team';
import { map, Subject } from 'rxjs';
import { DataService } from './data.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  http:HttpClient = inject(HttpClient);
  dataService: DataService = inject(DataService);
  teams: Subject<Team[]> = new Subject<Team[]>();
  addTeam(team:Team){
    return this.http.post<Team>(this.dataService.url, team)
  }
  getTeams(id:string){
    this.http.get<Team[]>(`${this.dataService.url}/teams/user/${id}`).
    subscribe( data =>{
      this.teams.next(data);
    })     
  }
  // constructor(private db: AngularFireDatabase){}
}

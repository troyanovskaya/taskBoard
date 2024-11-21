import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Team } from '../models/Team';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  http:HttpClient = inject(HttpClient);
  // db: AngularFireDatabase = inject(AngularFireDatabase);
  url = 'https://taskboard-eb7da-default-rtdb.firebaseio.com/teams.json';
  addTeam(team:Team){
    return this.http.post<Team>(this.url, team)
  }
  getTeams(id:string){
    return this.http.get<Team[]>(this.url).pipe(map((els) =>{
      els.filter(el =>{
        let flag = false;
        el.members.forEach(member =>{
          if(member.userId == id){
            flag = true;
          }
        })
        return flag;
      })
    }))
  }
  // constructor(private db: AngularFireDatabase){}
}

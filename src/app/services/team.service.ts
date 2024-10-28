import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  http:HttpClient = inject(HttpClient);
  // db: AngularFireDatabase = inject(AngularFireDatabase);
  url = 'https://taskboard-eb7da-default-rtdb.firebaseio.com/teams.json';
  addTeam(team:Team){
    this.http.post<Team>(this.url, team).subscribe( el => console.log(el))
  }
  // constructor(private db: AngularFireDatabase){}
}

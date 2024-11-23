import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //url:string = 'http://localhost:3000';
  url:string = 'https://us-central1-taskboard-eb7da.cloudfunctions.net/api';

  constructor() { }
}

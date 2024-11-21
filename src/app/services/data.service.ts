import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url:string = 'http://localhost:3000'

  constructor() { }
}

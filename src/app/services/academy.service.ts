import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademyService {

  constructor(private http : HttpClient) { }
  

  getAllLessons() {
     return this.http.get(`${environment.BaseApiUrl}/education/current/lessons`) ;
  }

}

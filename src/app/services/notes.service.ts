import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http : HttpClient) { }

  getAllNotes() {
    return this.http.get(`${environment.BaseApiUrl}/note/current/all`) ;
 }

 addNote(note : {content : String}) {
  return this.http.post(`${environment.BaseApiUrl}/note`,note) ;
}

}

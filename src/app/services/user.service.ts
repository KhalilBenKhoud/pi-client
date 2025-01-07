import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
  age?: number | null;
  experience?: string | null;
  education_level?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000'; 

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer la liste des utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/users`);
  }
  followTrader(traderId: number, percentageToInvest: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/copy/copytrade/follow/${traderId}?percentage_to_invest=${percentageToInvest}`, {});
  }

  unfollowTrader(traderId: number, followerId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/copy/copytrade/unfollow/${traderId}?follower_id=${followerId}`);
  }
}

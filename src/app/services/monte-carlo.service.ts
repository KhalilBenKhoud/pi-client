// monte-carlo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonteCarloService {
  private apiUrl = 'http://127.0.0.1:8000/risk/montecarlo';

  constructor(private http: HttpClient) {}

  getMonteCarloSimulations(userId: number, numSimulations: number, timeHorizon: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}?num_simulations=${numSimulations}&time_horizon=${timeHorizon}`);
  }
}

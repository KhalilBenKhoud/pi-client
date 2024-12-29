import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForcastingService {
  private baseUrl = 'http://127.0.0.1:8000/forecast';

  constructor(private http: HttpClient) {}

  getAvailableStocks(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/stocks`);
  }

  getForecast(symbol: string, years: number): Observable<any> {
    const body = { symbol, years };
    return this.http.post<any>(`${this.baseUrl}/forecast`, body);
  }
}

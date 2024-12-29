import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private apiUrl = 'http://127.0.0.1:8000/market';

  constructor(private http: HttpClient) {}

  // Fetch intraday data for a given symbol
  getIntradayData(
    symbol: string,
    timeframe: string,
    from?: string,
    to?: string
  ): Observable<any> {
    let url = `${this.apiUrl}/intraday/${symbol}?timeframe=${timeframe}`;
    if (from && to) {
      url += `&from=${from}&to=${to}`;
    }
    return this.http.get<any>(url);
  }
  // Handle potential errors from the backend
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Failed to fetch intraday data'));
  }

  
}

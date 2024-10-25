import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private apiUrl = 'http://127.0.0.1:8000/market/intraday';

  constructor(private http: HttpClient) {}

  // Fetch intraday data for a given symbol
  getIntradayData(symbol: string, timeframe: string = '5min'): Observable<any[]> {
    return this.http
      .get<any[]>((`${this.apiUrl}/${symbol}?timeframe=${timeframe}`), { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  // Handle potential errors from the backend
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Failed to fetch intraday data'));
  }

  
}

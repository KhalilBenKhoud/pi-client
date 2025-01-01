import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
interface Recommendation {
  current_price: number;
  recommended_price: number;
  recommendation: string;
}
@Injectable({
  providedIn: 'root'
})
export class PriceRecommenderService {

  private apiUrl = 'http://localhost:8000/price';

  constructor(private http: HttpClient) {}

  getRecommendation(symbol: string): Observable<Recommendation> {
    return this.http.get<Recommendation>(`${this.apiUrl}/recommendation/${symbol}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
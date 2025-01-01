import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScenarioService {
  private baseApiUrl = 'http://localhost:8000/historical';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all historical scenarios.
   * Returns an array of scenarios or throws an error.
   */
  getScenarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/scenarios`).pipe(
      map((response) => response), // Transform data if necessary
      catchError((error) => {
        console.error('Error fetching scenarios:', error);
        return throwError(() => new Error('Failed to fetch scenarios'));
      })
    );
  }

  /**
   * Fetch historical data for a specific scenario.
   * @param scenarioId The ID of the scenario.
   * Returns the historical data or throws an error.
   */
  getHistoricalData(scenarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/data/${scenarioId}`).pipe(
      map((response) => response), // Transform data if necessary
      catchError((error) => {
        console.error(`Error fetching historical data for scenario ${scenarioId}:`, error);
        return throwError(() => new Error('Failed to fetch historical data'));
      })
    );
  }

  /**
   * Fetch performance analysis for a specific scenario.
   * @param scenarioId The ID of the scenario.
   * Returns performance metrics and trade data or throws an error.
   */
  getPerformanceAnalysis(scenarioId: number): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/analysis/${scenarioId}`).pipe(
      map((response) => response), // Ensure data is structured correctly
      catchError((error) => {
        console.error(`Error fetching performance analysis for scenario ${scenarioId}:`, error);
        return throwError(() => new Error('Failed to fetch performance analysis'));
      })
    );
  }
}

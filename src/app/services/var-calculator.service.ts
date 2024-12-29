// src/app/services/var-calculator.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VarCalculatorService {
  private baseUrl = 'http://127.0.0.1:8000/risk/var'; // Update to your backend URL

  constructor(private http: HttpClient) {}

  calculateVar(symbol: string, confidenceLevel: number = 0.95): Observable<any> {
    const params = new HttpParams()
      .set('confidence_level', confidenceLevel.toString());

    return this.http.get<any>(`${this.baseUrl}/${symbol}`, { params });
  }

  getVar(userId: number, confidenceLevel: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}?confidence_level=${confidenceLevel}`);
  }
}

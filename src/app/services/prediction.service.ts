import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private http: HttpClient) { }

  compare(ticker1: String, ticker2: String): Observable<any> {
      return this.http.get<any>('http://localhost:8000/comparison/compare-tickers/'+ticker1+'/'+ticker2);
    }

  peer(tickerp: String): Observable<any> {
      return this.http.get<any>('http://localhost:8000/comparison/best-peer/'+tickerp);
    }


    private apiUrl = 'http://localhost:8000/predeiction/predict/';
    prediction(company: string): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(this.apiUrl, { company }, { headers });
    }


    rec(ticker: string, predictionDays: number = 60): Observable<any> {
      const body = { ticker, prediction_days: predictionDays };
      return this.http.post<any>('http://localhost:8000/strategy/trading_strategy/', body);
    }

    risk(ticker: String): Observable<any> {
      return this.http.get<any>('http://localhost:8000/risk/risk-assessment/'+ticker+'?timeframe=1year');
    }

    exp(ticker: String): Observable<any> {
      return this.http.get<any>('http://localhost:8000/strategy/recommendation/'+ticker);
    }
    


  
  }

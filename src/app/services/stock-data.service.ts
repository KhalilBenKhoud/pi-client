import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  private apiUrl = 'http://localhost:8000';  // URL de ton API FastAPI

  constructor(private http: HttpClient) { }

  // Appel à l'API pour récupérer les données du stock
  getStockData(stockSymbol: string, interval: string): Observable<any> {
    // Pass the stock symbol and interval as query parameters to the backend
    return this.http.get(`${this.apiUrl}/market/stock/${stockSymbol}?interval=${interval}`);
  }
  
  getStockData1(stockSymbol: string): Observable<any> {
    // Pass the stock symbol and interval as query parameters to the backend
    return this.http.get(`${this.apiUrl}/market/data/${stockSymbol}`);
  }
  createBuyOrder(order: { symbol: string; quantity: number; order_position_type: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/order/buy`, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  createSellOrder(order: { symbol: string; quantity: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/order/sell`, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  getAssets() {
    return this.http.get(`${this.apiUrl}/assets/all`); // Adjust URL based on your backend routing
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/order/all`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trade {
  id: number;
  symbol: string;
  action: string;
  quantity: number;
  price: number;
  timestamp: string;
  scenario_id: number;
  user_id: number;
}
@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private apiUrl = 'http://localhost:8000/historical/trades';

  constructor(private http: HttpClient) {}

  /**
   * Place a trade for the current scenario.
   * @param trade The trade object containing details like symbol, action, quantity, and price.
   */
  placeTrade(trade: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, trade);
  }

  /**
   * Retrieve the historical trades for the current scenario.
   */
    // Fetch trades for the current user
    getUserTrades(): Observable<Trade[]> {
      return this.http.get<Trade[]>(`${this.apiUrl}`);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  symbol: string;
  quantity: number;
  order_type: string;
  action: string;
  price?: number;
  take_profit?: number; // Optional TP field
  stop_loss?: number;   // Optional SL field
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/order';

  constructor(private http: HttpClient) {}

  // Récupération des commandes
  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}`);
  }

  // Placer une nouvelle commande
  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/`, order);
  }
}

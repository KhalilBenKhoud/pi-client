import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from '../services/order.service';
import { OrderResponse } from '../models/order.model';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit{
  orders: Order[] = [];

  newOrder: Order = {
    symbol: '',
    quantity: 0,
    order_type: 'market',
    action: 'buy',
    price: undefined,
  };
  errorMessage = '';
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.fetchOrders();
  }
  fetchOrders(): void {
    this.orderService.getUserOrders().subscribe(
      (orders) => (this.orders = orders),
      (error) => (this.errorMessage = 'Error fetching orders')
    );
  }


}

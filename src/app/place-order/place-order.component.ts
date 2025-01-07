import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService, Order } from '../services/order.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  orders: Order[] = [];

  newOrder: Order = {
    symbol: '',
    quantity: 0,
    order_type: 'market',
    action: 'buy',
    price: undefined,
    take_profit: undefined,
    stop_loss: undefined
  };

  orderTypes = [
    { label: 'Limit', value: 'limit' },
  ];

  actions = [
    { label: 'Buy', value: 'buy' },
    { label: 'Sell', value: 'sell' },
  ];

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  // Fetch user's orders via API
  fetchOrders(): void {
    this.orderService.getUserOrders().subscribe(
      (orders) => {
        this.orders = orders;
        this.showSuccess('Orders loaded successfully!');
      },
      (error) => {
        this.showError('Error fetching orders.');
        console.error(error);
      }
    );
  }

  // Place a new order
  placeOrder(): void {
    console.log('Placing order:', this.newOrder);

    this.orderService.placeOrder(this.newOrder).subscribe(
      (order) => {
        this.orders.push(order); // Add the order to the list
        this.resetOrderForm();  // Reset the form
        this.showSuccess('Order placed successfully!');
      },
      (error) => {
        this.showError('Error placing order.');
        console.error(error);
      }
    );
  }

  resetOrderForm(): void {
    this.newOrder = { symbol: '', quantity: 0, order_type: 'market', action: 'buy', price: undefined, take_profit: undefined, stop_loss: undefined };
  }

  // Show success alert
  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 seconds
      panelClass: ['success-snackbar'] // Custom class for styling
    });
  }

  // Show error alert
  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 seconds
      panelClass: ['error-snackbar'] // Custom class for styling
    });
  }
}

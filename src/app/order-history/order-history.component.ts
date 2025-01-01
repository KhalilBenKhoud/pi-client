// src/app/components/order-history/order-history.component.ts

import { Component, OnInit } from '@angular/core';
import { StockDataService } from '../services/stock-data.service';  // Import the service
import { Order } from '../model/order';  // Import the Order model

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];  // Array to store order history
  errorMessage: string = '';  // To store error messages, if any

  constructor(private stockDataService: StockDataService) {}

  // Lifecycle hook that runs when the component is initialized
  ngOnInit(): void {
    this.loadOrders();  // Load orders when the component initializes
  }


  // Fetches the order history from the service
  loadOrders(): void {
    this.stockDataService.getOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;  // Assign the fetched data to the orders array
        this.errorMessage = '';  // Clear any previous error messages
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des ordres.';  // Set the error message
        console.error('Error loading orders:', error);  // Log the error for debugging
      }
    );
  }
}

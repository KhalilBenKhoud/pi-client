import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../services/order.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  orders: Order[] = [];
  errorMessage = '';

  // Définir une commande avec les champs requis pour l'API
  newOrder: Order = {
    symbol: '',
    quantity: 0,
    order_type: 'market',
    action: 'buy',
    price: undefined,
  };

  // Options pour le type d'ordre et l'action
  orderTypes = [
    { label: 'Market', value: 'market' },
    { label: 'Limit', value: 'limit' },
  ];

  actions = [
    { label: 'Buy', value: 'buy' },
    { label: 'Sell', value: 'sell' },
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  // Récupération des commandes de l'utilisateur via l'API
  fetchOrders(): void {
    this.orderService.getUserOrders().subscribe(
      (orders) => (this.orders = orders),
      (error) => (this.errorMessage = 'Erreur lors de la récupération des commandes')
    );
  }

  // Placer une nouvelle commande en appelant l'API
  placeOrder(): void {
    this.orderService.placeOrder(this.newOrder).subscribe(
      (order) => {
        this.orders.push(order);  // Ajouter la commande à la liste
        this.resetOrderForm();    // Réinitialiser le formulaire
      },
      (error) => (this.errorMessage = 'Erreur lors de la création de la commande')
    );
  }

  // Réinitialisation des valeurs de la commande
  resetOrderForm(): void {
    this.newOrder = { symbol: '', quantity: 0, order_type: 'market', action: 'buy', price: undefined };
  }
}

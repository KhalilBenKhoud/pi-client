// models/order.model.ts

export interface OrderCreate {
  symbol: string;         // Stock or asset symbol, e.g., "AAPL"
  quantity: number;      // Quantity of the asset to buy or sell
  order_type: string;    // Type of order: 'market' or 'limit'
  action: string;        // Action: 'buy' or 'sell'
  price?: number;        // Optional price for limit orders
}

export interface OrderResponse {
  id: number;            // Unique identifier for the order
  symbol: string;        // Stock or asset symbol
  quantity: number;      // Quantity of the asset
  price: number;         // Price at which the order was placed
  order_type: string;    // Type of order: 'market' or 'limit'
  action: string;        // Action: 'buy' or 'sell'
  status: string;        // Status of the order: 'executed' or 'pending'
  executed_at?: string;  // Timestamp of execution (if executed)
}

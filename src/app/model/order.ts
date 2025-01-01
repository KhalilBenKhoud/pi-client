export interface Order {
    id: number;
    symbol: string;
    quantity: number;
    price: number | null;
    order_type: string; // 'buy' or 'sell'
    order_position_type: string; // 'long' or 'short'
    executed_at: string | null; // ISO date string
  }
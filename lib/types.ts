export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: "pending" | "completed";
  createdAt: Date;
}

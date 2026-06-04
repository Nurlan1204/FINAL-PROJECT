export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  rating: number;
}

export interface CartItem {
  id: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export type Page =
  | 'main'
  | 'cart'
  | 'auth'
  | 'product-detail';
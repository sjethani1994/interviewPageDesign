export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

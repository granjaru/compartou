export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  offers: Offer[];
}

export interface Offer {
  id: string;
  store: string;
  price: number;
  condition: 'new' | 'used' | 'refurbished';
  shipping: number;
  totalPrice: number;
  url: string;
  availability: boolean;
}

export interface Store {
  id: string;
  name: string;
  logo: string;
  type: 'marketplace' | 'retailer';
}
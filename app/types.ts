export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface Order {
  order_number: string;
  customer_name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  total: number;
  delivery_charge?: number;
  payment_status: string;
  order_status: string;
  items: OrderItem[];
}

export interface OrderItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

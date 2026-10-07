export type Category = 'all' | 'mens' | 'womens' | 'wholesale' | 'readymade';

export interface Product {
  id: string;
  name: string;
  nameBn: string;
  category: 'mens' | 'womens' | 'wholesale' | 'readymade';
  subcategory: string;
  subcategoryBn: string;
  price: number;
  originalPrice: number;
  wholesalePrice: number;
  wholesaleMinQty: number;
  image: string;
  gallery?: string[];
  description: string;
  descriptionBn: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  fabric: string;
  fabricBn: string;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  isWholesale?: boolean;
}

export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'rocket';
export type OrderStatus = 'placed' | 'confirmed' | 'packaging' | 'shipped' | 'out_for_delivery' | 'delivered';

export interface TimelineStep {
  title: string;
  titleBn: string;
  time: string;
  description: string;
  descriptionBn: string;
  done: boolean;
  current?: boolean;
}

export interface Order {
  orderId: string;
  customerName: string;
  phone: string;
  alternativePhone?: string;
  address: string;
  district: string;
  deliveryArea: 'inside_sylhet' | 'outside_sylhet';
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'verified_paid';
  transactionId?: string;
  senderNumber?: string;
  status: OrderStatus;
  courierName: string;
  courierTrackingCode: string;
  estimatedDelivery: string;
  createdAt: string;
  notes?: string;
  timeline: TimelineStep[];
}

export interface WholesaleQuoteItem {
  category: string;
  targetQuantity: number;
  estimatedBudget: number;
}

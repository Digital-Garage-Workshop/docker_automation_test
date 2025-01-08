export type ShippingMethod = "delivery" | "pickup";

export interface Images {
  imgurl200: string;
  imgurl400: string;
}

export interface BranchPart {
  partid: number;
  branch: string;
  organization: string;
  price: number;
  salepercent?: number;
  pricesale?: number;
}

export interface Product {
  articleid: number;
  category: string;
  articleno: string;
  brandname: string;
  star: number | null;
  images: Images[];
  reward: boolean;
  branchparts: BranchPart[];
  carid: string;
}

export interface CartItem extends Product {
  quantity: number;
  shippingMethod: ShippingMethod;
}

export interface CartState {
  pickupItems: CartItem[];
  deliveryItems: CartItem[];

  checkedDelivery: Record<number, boolean>; // Track selected state for delivery items
  checkedPickup: Record<number, boolean>; // Track selected state for pickup items
  selectedArticles: CartItem[]; // List of selected articles for checkout
  total: number; // Total amount for selected articles
}

export interface ProductArray {
  products: Product[];
}

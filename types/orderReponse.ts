// src/types/orderTypes.ts

export interface OrderDetail {
  id: number;
  ordertype: string;
  service: string;
  subservice: string;
  // Add other relevant fields based on your actual data
}

export interface OrderData {
  orderid: number;
  ordertype: string;
  addpoint: number;
  alltotal: number;
  paidtotal: number;
  allquantity: number;
  address: string | null;
  bookingdate: string | null;
  bookingtime: string | null;
  createdDate: string;
  deliverystatus: string | null;
  deliverytotal: number | null;
  deliverytype: string | null;
  details: OrderDetail[];
  durationtime: string | null;
  ispaid: boolean;
  lang: string | null;
  long: number | null;
  platenumber: string;
  point: string | null;
  status: string;
  statustype: string;
  message: string;
  phone?:string | null
}

export interface OrderResponse {
  success: boolean;
  data: OrderData;
}

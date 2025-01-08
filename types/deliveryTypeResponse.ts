export type DeliveryType = {
  deliverytypeid: number;
  name: string;
  deliverytime: string;
  deliveryprice: number;
  description: string;
};

export type ApiResponse = {
  success: boolean;
  data: DeliveryType[];
  message: string;
};

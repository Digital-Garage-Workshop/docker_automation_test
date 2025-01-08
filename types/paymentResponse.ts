export interface CreateOrderResponse {
  success?: boolean;
  data?: PaymentData;
  message?: string;
}

export interface PaymentData {
  orderid?: number;
  splits?: Split[];
  transfers?:Transfers;
  wallets?: any[];
  applications?: Applications;
}

export interface Split {
  paymentid?: number;
  name?: string;
  icon?: string;
  invoiceid?: number;
  qrcode?: string;
  deeplink?: string;
}

export interface Applications {
  paymentid?: number;
  qpay?: QPay;

}

export interface QPay {
  invoice_id?: string;
  qr_text?: string;
  qr_image?: string;
  qPay_shortUrl?: string;
  urls?: Url[];
}

export interface Url {
  name?: string;
  description?: string;
  logo?: string;
  link?: string;
}

export interface Transfers{
    paymentid?: 3,
    bankname?: string,
    accountname?: string,
    accountnumber?: string,
    description?: string,
}
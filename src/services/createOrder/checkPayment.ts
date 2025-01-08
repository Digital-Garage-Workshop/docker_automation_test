import {AxiosRequestConfig} from "axios";
import {axiosClient} from "@/utils/api";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export const CheckPayment = async ({config, body}: Prop) => {
  const {invoiceid, paymentid, orderid} = body;
  const response = await axiosClient.get(
    `payment/qpay/check?invoiceid=${invoiceid}&orderid=${orderid}&paymentid=${paymentid}`,
    config
  );
  return response;
};

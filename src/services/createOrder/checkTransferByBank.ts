import {AxiosRequestConfig} from "axios";
import {axiosClient} from "@/utils/api";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export const CheckTransferByBank = async ({config, body}: Prop) => {
  const {invoiceid, paymentid, orderid} = body;
  const queryparams = {"invoiceid":invoiceid, 'orderid':orderid,'paymentid':paymentid }
  const response = await axiosClient.post(
    `payment/cgw/check`,
    queryparams,
    config
  );
  return response;
};

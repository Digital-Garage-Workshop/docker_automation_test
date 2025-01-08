import {AxiosRequestConfig} from "axios";
import {axiosClient} from "@/utils/api";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export const CreateOrderPickUp = async ({config, body}: Prop) => {
  const response = await axiosClient.post("/order/pickup", body, config);
  return response;
};

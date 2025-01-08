import axios, { AxiosRequestConfig } from "axios";
import { axiosClient } from "@/utils/api";


type Prop = {
    config?: AxiosRequestConfig;
    body?: any;
    params?: any;
  };
  

export const CreateOrderDelivery = async ({ config, body }: Prop) => {
    

  const response = await axiosClient.post("/order/delivery", body, config);
  return response;
};

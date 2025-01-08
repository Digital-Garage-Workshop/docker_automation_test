import  { AxiosRequestConfig } from "axios";
import { axiosClient } from "@/utils/api";


type Prop = {
    config?: AxiosRequestConfig;
    body?: any;
    params?: any;
  };
  

export const GetBusTerminal = async ({ config, body }: Prop) => {
  const response = await axiosClient.get("/order/terminal",  config);
  return response;
};

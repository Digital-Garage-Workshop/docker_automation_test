
import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export const CancelOrder =({config, body}:Prop)=>{
    const {id}= body
    return axiosClient.get(`/user/order/cancel/${id}`,config)
}
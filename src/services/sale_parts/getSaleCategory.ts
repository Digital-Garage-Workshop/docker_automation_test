import {axiosClient} from "@/utils/api";
import {AxiosRequestConfig} from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function GetSaleCategory({config, body}: Prop) {
  return axiosClient.get(`/part/salepart/category`, config);
}

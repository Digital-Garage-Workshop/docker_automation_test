import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function ServicesDetail({ config, body }: Prop) {
    const {serviceid }=body
  return axiosClient.get(`/diagnose/profile?serviceid=${serviceid}`, config);
}

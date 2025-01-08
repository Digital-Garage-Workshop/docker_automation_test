import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function GpointHistory({ config, body }: Prop) {
  return axiosClient.get(`/user/point/history`, config);
}
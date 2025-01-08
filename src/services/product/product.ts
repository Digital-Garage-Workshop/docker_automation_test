import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function Product({ config, body }: Prop) {
  const { partId, carid } = body;
  const queryparams = { 'articleid': partId, 'carid': carid };
  return axiosClient.get(`/part/detail`, { params: queryparams });
}

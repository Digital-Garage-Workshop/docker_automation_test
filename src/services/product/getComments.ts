import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

export type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function GetComments({ config, body }: Prop) {
  const {articleid} = body
  return axiosClient.get(`/part/review?articleid=${articleid}`, config);
}

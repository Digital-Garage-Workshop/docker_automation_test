import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function ServicesByCategory({ config, body }: Prop) {
    const {categoryid}=body
  return axiosClient.get(`/diagnose/branches?categoryid=${categoryid}`, config);
}

import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function ComportableBrand({ config, body }: Prop) {
    const {articleId}= body
  return axiosClient.get(`/part/comfortable/carbrand?articleid=${articleId}`, config);
}

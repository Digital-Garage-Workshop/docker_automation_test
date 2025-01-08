

import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function OeNumber({ config, body }: Prop) {
    const {articleId, manuid}= body
  return axiosClient.get(`/oemnumber?articleid=${articleId}`, config);
}

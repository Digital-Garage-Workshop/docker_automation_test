

import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function RelatedProduct({ config, body }: Prop) {
    const {categoryid, articleid,carid}= body;
    const queryparams = {'categoryid':categoryid, 'articleid':articleid,'carid':carid}
  return axiosClient.get(`/part/relatedparts`, {
    params:queryparams,
    ...config
  });
}

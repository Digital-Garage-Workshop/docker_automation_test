

import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: {
    regnumber:number
  };
};

export function GetCompanyNameByRe({ config, body }: Prop) {
  const { regnumber } = body || {};

  return axiosClient.get(
    `/ebarimt`,
    {
      ...config,
      params: {
        regnumber
      },
    }
  );
}



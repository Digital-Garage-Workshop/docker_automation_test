



import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any
};

export function GetEbarimtData({ config, body }: Prop) {


  return axiosClient.get(
    `/user/ebarimt`,
    {
      ...config,
   
    }
  );
}



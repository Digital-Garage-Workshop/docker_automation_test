

import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: {
    giftid:number
    lotteries:number
  };
  params?: any;
};

export const ParticipateLottery = ({ body, params, config }: Prop) => {

  if (!body) {
    throw new Error("Body is required");
  }

  const { giftid ,lotteries} = body;

  const response = axiosClient.post(
    "/user/reward/store", 
    {
        giftid:giftid,
        lotteries:lotteries
    },  
    { ...config,
        params:params
    }
  );
  return response;
};

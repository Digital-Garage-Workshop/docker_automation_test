import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
};

export function GetLotteries({ config, body }: Prop) {
  return axiosClient.get(`/user/lottery/activelottery`, {
    ...config,
  });
}

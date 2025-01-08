import {AxiosRequestConfig} from "axios";
import {axiosClient} from "@/utils/api";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export const storepayRequest = async ({config, body}: Prop) => {
  const response = await axiosClient.post("/payment/storepay", body, config);
  return response;
};

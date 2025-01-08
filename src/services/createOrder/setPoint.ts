import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export const SetPoint = async ({ config, body }: Prop) => {
  const { orderid, ischeck } = body;

  const response = await axiosClient.post(
    `payment/setpoint?orderid=${orderid}&ischeck=${ischeck}`,
    body,
    config
  );
  return response;
};

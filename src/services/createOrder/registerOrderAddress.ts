import {AxiosRequestConfig} from "axios";
import {axiosClient} from "@/utils/api";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export const RegisterOrderAddress = async ({config, body}: Prop) => {
  const response = await axiosClient.post(
    "/order/updateorder",
    body.body,
    config
  );
  return response;
};

import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function DeliveryType({ config, body }: Prop) {
  const { zipcode, lang, long } = body;

  return axiosClient.get(
    `/order/deliverytype?zipcode=${zipcode}&lang=${lang}&long=${long}`,
    config
  );
}

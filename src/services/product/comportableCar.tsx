import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function ComportableCar({ config, body }: Prop) {
  const { articleId, manuid, modelid } = body;
  return axiosClient.get(
    `/part/comfortable/carengine?articleid=${articleId}&manuid=${manuid}&modelid=${modelid}`,
    config
  );
}

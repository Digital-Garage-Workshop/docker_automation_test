import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function GetPartBrands({ config, body }: Prop) {
  const { categoryId, carId } = body;

  return axiosClient.get(
  `/part/partbrand?categoryid=${categoryId}&carid=${carId}`);
}

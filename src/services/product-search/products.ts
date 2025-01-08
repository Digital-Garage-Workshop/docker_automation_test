import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
};

export function Products({ config, body }: Prop) {
  const { categoryId, carId, attrValueId, brandno, page } = body;

  // Create base params object
  const params: Record<string, any> = {
    categoryid: categoryId,
  };

  // Only add params if they have truthy values
  if (carId) params.carid = carId;
  if (page) params.page = page;
  if (attrValueId) params["attrvalueids[]"] = attrValueId;
  if (brandno) params.brandno = brandno;

  return axiosClient.get("/part", {
    params,
    ...config,
  });
}
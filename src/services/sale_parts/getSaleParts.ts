import {axiosClient} from "@/utils/api";
import {AxiosRequestConfig} from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function GetSaleParts({config, body}: Prop) {
  const {categoryId, carId, attrValueId, brandno, page} = body;
  return axiosClient.get(`/part/salepart`, {
    params: {
      carid: carId,
      page: page,
      category: categoryId,
      "attrvalueids[]": attrValueId,
    },
    ...config,
  });
}

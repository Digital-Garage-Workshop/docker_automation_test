import {axiosClient} from "@/utils/api";
import {AxiosRequestConfig} from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function GetSaleFilter({config, body}: Prop) {
  const {articleIds, categoryId} = body;
  const queryParams = {"articleids[]": articleIds, category: categoryId};

  return axiosClient.get("/part/salepart/filter", {
    params: queryParams,
  });
}

// articleids[]=38224302&articleids[]=38224299&articleids[]=1386534079

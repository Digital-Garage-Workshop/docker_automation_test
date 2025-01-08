import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function Filter({ config, body }: Prop) {
    const {carid, categoryid}= body
    const queryParams = {  'categoryid': categoryid , "carid": carid};

  return axiosClient.get(
  "/part/filters",
  {
    params: queryParams,
  });
}

// articleids[]=38224302&articleids[]=38224299&articleids[]=1386534079

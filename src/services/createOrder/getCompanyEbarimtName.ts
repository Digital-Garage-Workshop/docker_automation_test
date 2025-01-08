import { AxiosRequestConfig } from "axios";
import { axiosClient } from "@/utils/api";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export const GetCompanyEbarimtName = async ({ config, body }: Prop) => {
  const { regnumber } = body;
  const response = await axiosClient.get(
    `/ebarimt?regnumber=${regnumber}`,
    config
  );
  return response;
};

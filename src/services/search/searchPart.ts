import {axiosClient} from "@/utils/api";
import {AxiosRequestConfig} from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: string;
};

export function SearchPart({config, body}: Prop) {
  return axiosClient.get(`search?q=${body}`, config);
}

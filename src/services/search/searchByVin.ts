import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export function SearchByVin({ config, body }: Prop) {
	const { number } = body;
    return axiosClient.get(`/vin`, {
        ...config,
        params: {
          number:number
        },
      });
}

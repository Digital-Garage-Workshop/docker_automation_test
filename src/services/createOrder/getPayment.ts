import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export function GetPayment({ config, body }: Prop) {
    const { orderid, } = body;
    
	return axiosClient.get(`payment?orderid=${orderid}`,config);
}

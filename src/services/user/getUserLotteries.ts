


import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export function GetUserLotteries({body, config}:Prop){
	return axiosClient.get("/user/lottery/reward",config);
}
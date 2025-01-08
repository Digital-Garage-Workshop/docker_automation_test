import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export function GetBestSellers({ config, body }: Prop) {
	const {carid} = body
	const queryparams = {'carid':carid}
	return axiosClient.get("/part/popularpart",
		{params:queryparams,
			...config
		}
	);
}

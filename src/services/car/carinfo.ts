import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export function CarInfo({ config, body }: Prop) {
	const { carid } = body;
	const queryParams = { "carid": carid};
	return axiosClient.get(`/carinfo`,
		{
			params: queryParams,
		});
	return axiosClient.get(`/carinfo?carid=${carid}`, config);
}

import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export function CarSelectedCategory({ config, body }: Prop) {
	const { carid } = body;
	return axiosClient.get(`/subcategorybycar/?carid=${carid}&location=`,config);
}

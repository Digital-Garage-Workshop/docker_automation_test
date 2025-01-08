import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
    id?: string;
};

export function CarModels({ config, body }: Prop) {
	const { id } = body;
	return axiosClient.get(`/carmodels/${id}`, config);
}

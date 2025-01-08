import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
    id?: string;
};

export function Engine({ config, body }: Prop) {
	const { manuid, modelid } = body;
	return axiosClient.get(`/carengines/${manuid}/${modelid}`, config);
}

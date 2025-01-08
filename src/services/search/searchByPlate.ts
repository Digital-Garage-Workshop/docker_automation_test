import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export function SearchByPlate({ config, body }: Prop) {
	const { platenumber } = body;
	const queryParams = { "platenumber": platenumber};
	return axiosClient.get(`/plate`,
		{
			params: queryParams,
		});
	return axiosClient.get(`/plate?platenumber=${platenumber}`,config);
}

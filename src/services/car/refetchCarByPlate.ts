import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export function RefetchhByPlate({ config, body }: Prop) {
	const { platenumber } = body;
	const queryParams = { "platenumber": platenumber};
	return axiosClient.get(`/platenew`,
		{
			params: queryParams,
		});

	return axiosClient.get(`/platenew?platenumber=${platenumber}`,config);
}

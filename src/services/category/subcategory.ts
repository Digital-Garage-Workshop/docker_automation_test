import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export function SubCategory({ config, body }: Prop) {
	const { categoryid,carid} = body;
	const queryParams = { "categoryid": categoryid,"carid": carid};
	return axiosClient.get(`/subcategory`,
		{
			params: queryParams,
		});
}

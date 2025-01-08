import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export function Parts({ config, body }: Prop) {
	const { categoryid,subCategoryId} = body;
	return axiosClient.get(`/subcategory?categoryid=${categoryid}&carid=${subCategoryId}&location`,config);
}

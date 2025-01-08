import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";
import { headers } from "next/headers";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export function AllCategory({ config, body }: Prop) {
	return axiosClient.get("/allcategory",config);
}

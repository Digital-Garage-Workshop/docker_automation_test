import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: {
    zipcode: number;
    phone: number;
    address: string;
    lang: string;
    long: string;
    apartmentnumber: string;
    doornumber: string;
  };
  params?: any;
};

export const PostUserAddress = ({ body, params, config }: Prop) => {
  if (!body) {
    throw new Error("Body is required");
  }

  const { zipcode, phone, address, lang, long, apartmentnumber, doornumber } = body;

  const formData = new FormData();
  formData.append("zipcode", String(zipcode));
  formData.append("phone", String(phone));
  formData.append("address", address);
  formData.append("lang", lang);
  formData.append("long", long);
  formData.append("apartmentnumber", apartmentnumber);
  formData.append("doornumber", doornumber);

  const response = axiosClient.post("/user/address/store", formData, {
    ...config,
    params: { ...params },

    headers: {
      "Content-Type": "multipart/form-data", 
      ...config?.headers,
    },
  });

  return response;
};

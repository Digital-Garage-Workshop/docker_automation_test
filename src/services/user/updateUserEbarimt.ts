


import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";
import { headers } from "next/headers";

type Prop = {
  config?: AxiosRequestConfig;
  body?: {
    type: string;
    enumber: string;
    companyname?: string;
    email?: string;
  };
  params?: any;
};

export const UpdateUserEbarimt = ({ body, params, config }: Prop) => {
  if (!body) {
    throw new Error("Body is required");
  }

  const { type, enumber, companyname, email } = body;
  
  const formData = new FormData();
  formData.append("type", type);
  formData.append("enumber", enumber);
  if (type === "corporate" && companyname) {
    formData.append("companyname", companyname);
  }
  if (type === "personal" && email) {
    formData.append("email", email);
  }

  const response = axiosClient.post("/user/ebarimt", formData, {
    ...config,
    params,
    headers: {
      'Content-Type': 'multipart/form-data', 
      ...config?.headers,
    },
  });

  return response;
};


import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: {
    manuid: string;
    plate: string;
    comment: string;
  };
  params?: any;
};

export const AddVehicleRequest = ({ body, params, config }: Prop) => {
  if (!body) {
    throw new Error("Body is required");
  }

  const { manuid, plate, comment } = body;


  const formData = new FormData();
  formData.append("platenumber", plate);
  formData.append("manuid", manuid);
  formData.append("comment", comment);

  const response = axiosClient.post("/registercar", formData, {
    ...config,
    params: params,
    headers: {
      "Content-Type": "multipart/form-data", 
      ...config?.headers,
    },
  });

  return response;
};

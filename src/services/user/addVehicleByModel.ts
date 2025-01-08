

import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: {
    carid:string
  };
  params?: any;
};

export const AddVehicleByModal = ({ body, params, config }: Prop) => {

  if (!body) {
    throw new Error("Body is required");
  }

  const { carid } = body;

  const response = axiosClient.post(
    "/user/car/addcar", 
    {
        carid:carid
    },  
    { ...config,
        params:params
    }
  );
  return response;
};

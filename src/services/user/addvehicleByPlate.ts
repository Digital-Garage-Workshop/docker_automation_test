import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: {
    plateNumber:string
  };
  params?: any;
};

export const AddVehicleByPlate = ({ body, params, config }: Prop) => {

  if (!body) {
    throw new Error("Body is required");
  }

  const { plateNumber } = body;

  const response = axiosClient.post(
    "/user/car/addplate", 
    {
        platenumber:plateNumber
    },  
    { ...config,
        params:params
    }
  );
  return response;
};

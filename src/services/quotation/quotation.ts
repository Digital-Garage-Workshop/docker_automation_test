import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

interface Part {
  part_name: string;
  unit: string;
  quantity: number;
  description: string;
}

interface Car {
  platenumber?: string;
  vin?: string;
  car_brand?: string;
  car_model?: string;
  car_engine?: string;
  parts: Part[];
}

interface PriceQuoteBody {
  email: string;
  phone: string;
  org_regnumber: string;
  org_name: string;
  end_date: string;
  cars: Car[];
}

type Prop = {
  config?: AxiosRequestConfig;
  body?: PriceQuoteBody;
  params?: any;
};

export const PostQoutation = async ({ body, params, config }: Prop) => {
  if (!body) {
    throw new Error("Body is required");
  }

  const response = await axiosClient.post("/pricequote", body, {

    ...config,
    params,
    headers: {
      'Content-Type': 'application/json',
      ...config?.headers,
    },
  });

  return response;
};
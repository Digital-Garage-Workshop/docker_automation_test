
// import axios, { AxiosRequestConfig } from "axios";
// import { axiosClient } from "@/utils/api";


// type Prop = {
//     config?: AxiosRequestConfig;
//     body?: any;
//     params?: any;
//   };
  

// export const AddComment = async ({ config, body }: Prop) => {
//   const response = await axiosClient.post("/part/review", body, config);
//   return response;
// };





import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";
import { headers } from "next/headers";

type Prop = {
  config?: AxiosRequestConfig;
  body?: {
    articleid: string;
    comment: string;
    star: string;
  };
  params?: any;
};

export const AddComment = ({ body, params, config }: Prop) => {
  if (!body) {
    throw new Error("Body is required");
  }

  const { articleid, comment, star } = body;
  
  const formData = new FormData();
  formData.append("articleid", articleid);
  formData.append("comment", comment);
  formData.append("star", star);


  const response = axiosClient.post("/part/review", formData, {
    ...config,
    params,
    headers: {
      'Content-Type': 'multipart/form-data', 
      ...config?.headers,
    },
  });

  return response;
};


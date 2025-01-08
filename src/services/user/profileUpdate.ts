// import { axiosClient } from "@/utils/api";
// import { AxiosRequestConfig } from "axios";

// type Prop = {
//   config?: AxiosRequestConfig;
//   body?: any;
//   params?: any;
// };

// export function ProfileUpdate({ config, body }: Prop) {
//   const { name, lastname, phone, gender, birthdate } = body;
//   const queryParams = {
//     'lastname': lastname,
//     'name': name,
//     'phone': phone,
//     'gender': gender,
//     'birthdate': birthdate,
//   };
//   return axiosClient.post(
//     `/user/update`,
//     {
//       params: queryParams,
//     },
//     config
//   );
// }

import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: {
    name: string;
    lastname: string;
    phone: string;
    gender: string;
    birthdate: string;
  };
};

export function ProfileUpdate({ config, body }: Prop) {
  const { name, lastname, phone, gender, birthdate } = body || {};

  return axiosClient.post(
    `/user/update`,
    {},
    {
      ...config,
      params: {
        lastname,
        name,
        phone,
        gender,
        birthdate,
      },
    }
  );
}



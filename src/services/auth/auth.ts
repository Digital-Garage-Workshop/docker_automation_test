import {axiosClient} from "../../utils/api";
import {AxiosRequestConfig} from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function SignUp({config, body}: Prop) {
  return axiosClient.post("/signup", body, config);
}

export function SignIn(email: string, password: string, {config, body}: Prop) {
  return axiosClient.post("/social/login", body, config);
}
export function AuthMe(refresh_token: string) {
  return axiosClient.post("/refresh", {refresh_token});
}

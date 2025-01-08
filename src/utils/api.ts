import axios from "axios";

const axiosClient = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_TEST_URL_API,
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export {axiosClient};

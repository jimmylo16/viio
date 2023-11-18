import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
});

const setAccessToken = (token: string) => {
  const accessToken = token;
  Cookies.set("caspioToken", JSON.stringify(token));
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

axiosInstance.interceptors.response.use((response) => {
  console.log(response.config);
  if (response.config.baseURL === "/") {
    // setAccessToken()
  }
  return response;
});

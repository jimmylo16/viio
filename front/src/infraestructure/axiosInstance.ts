import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
});

const setAccessToken = (token: string) => {
  const accessToken = token;
  Cookies.set("token", token);
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  if (
    response.config.url === "/auth/login" ||
    response.config.url === "/auth/register"
  ) {
    const token = response.data.token;

    setAccessToken(token);
  }
  return response;
});

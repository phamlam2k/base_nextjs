import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import { getAccessTokenCookie } from "./serverHelper";

const axiosServices: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axios.interceptors.request.use(
  (response) => {
    response.headers["Accept-Language"] =
      localStorage.getItem("language") || "en";

    return response;
  },
  (error: unknown) => Promise.reject(error)
);

// interceptor for http
axiosServices.interceptors.request.use(
  (response: InternalAxiosRequestConfig) => {
    response.headers["Accept-Language"] =
      localStorage.getItem("language") || "en";

    const accessToken = getAccessTokenCookie();

    if (accessToken) {
      response.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return response;
  },
  (error: unknown) => Promise.reject(error)
);

axiosServices.interceptors.response.use(
  (response: AxiosResponse) => {
    response.headers["ngonngu"] = "en";

    return response;
  },
  (error: AxiosError) => {
    if (
      error.response &&
      error.response.config.headers["Authorization"] &&
      error.response.status === 401
    ) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosServices;

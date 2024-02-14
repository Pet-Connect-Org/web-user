import axios, { AxiosError } from "axios";

const PCConnectionInstance = axios.create({
  timeout: 20000,
  withCredentials: true,
  baseURL: "http://127.0.0.1:8000/api",
});

PCConnectionInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const axiosError = error as AxiosError;

    if (
      axiosError.response?.status === 500 ||
      axiosError.response?.status === 404
    ) {
    }

    if (axiosError.response?.status === 401) {
    }

    return Promise.reject(error);
  }
);

export { PCConnectionInstance };

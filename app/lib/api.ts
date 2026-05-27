/* eslint-disable prettier/prettier */
import axios from "axios";
import { ellipsis } from "./utils";

// import { router } from "expo-router";
// import { showToast } from "./toast/Toast";
// const { BaseUrl } = envConfig;
const BaseUrl = "https://portfolio-pal-backend.onrender.com/";
// console.log("Base URL:>>>>>>>>>>>>", BaseUrl);

const apiClient = () => {
  const axiosInstance = axios.create({
    baseURL: BaseUrl,
    // timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (config: any) => {
      const token = localStorage.getItem("userToken");
      console.log(
        "Token From The Axios Api Client:>>>>>>>>>>>>>>>>>>>>",
        ellipsis(token || "No token....", 20),
      );

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("User authorization error:>>>>>>>>>>>>", error);
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Handle token refresh or logout
        localStorage.removeItem("userToken");
        // Redirect to login screen

        // showToast("info", "Please login in again...");
        console.log("Please login in again...");
        // router.replace("/login"); // Use `replace` to prevent going back to the previous screen
      }
      // console.error("Error for user authentication:>>>", error);
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export default apiClient;

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ellipsis } from "./utils";
import { toast } from "sonner";

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
    (config: InternalAxiosRequestConfig) => {
      // const token = localStorage.getItem("userToken");
      // console.log(
      //   "Token From The Axios Api Client:>>>>>>>>>>>>>>>>>>>>",
      //   // ellipsis(token.length || "No token....", 20),
      //   token,
      // );

      // if (token) {
      //   config.headers["Authorization"] = `Bearer ${token}`;
      // }
      // return config;

      // Only access localStorage on the client side
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("userAccessToken");
        console.log(
          "Token From The Axios Api Client:>>>>>>>",
          ellipsis(token || "No token....", 20),
        );

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
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
    // if (error.response?.status === 401) {
    //   // Handle token refresh or logout
    //   localStorage.removeItem("userToken");
    //   // Redirect to login screen

    //   // showToast("info", "Please login in again...");
    //   console.log("Please login in again...");
    //   // router.replace("/login");
    // }
    // // console.error("Error for user authentication:>>>", error);
    // return Promise.reject(error);

    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          try {
            const response = await axios.post(`${BaseUrl}/auth/refresh`, {
              refreshToken,
            });
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = response.data;

            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            console.log("Token refreshed...!");
            toast.success("Token refreshed.", {
              position: "top-right",
              duration: 5000,
            });

            // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            // return apiClient(originalRequest);
          } catch (refreshError) {
            console.warn("Unauthorized! Clearing token and redirecting...");
            console.error("Token refresh failed:", refreshError);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return Promise.reject(refreshError);
          }
        }

        // if (typeof window !== "undefined") {
        //   localStorage.removeItem("userAccessToken");
        //   // Safe client-side redirect fallback if Next.js router isn't available globally
        //   window.location.href = "/login";
        // }
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export default apiClient;

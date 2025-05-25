import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // Thay bằng API server của bạn
  withCredentials: true, // Quan trọng để gửi cookie chứa refresh token
});

// Thêm interceptor cho request
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Thêm interceptor cho response
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newToken) {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(API(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const { data } = await API.post(
          "auth/refreshToken",
          {},
          { withCredentials: true }
        );

        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        API.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        isRefreshing = false;
        onRefreshed(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        console.error("Refresh token failed", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;

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
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gọi API refreshToken và gửi kèm cookies
        const { data } = await API.post(
          "auth/refreshToken",
          {},
          { withCredentials: true }
        );

        // Cập nhật accessToken mới vào headers
        localStorage.setItem("accessToken", data.accessToken);
        API.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;

        // Gửi lại request gốc
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;

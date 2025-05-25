import axios from "axios";
import API from "../config/axiosInterceptor";

const proxy = "http://localhost:8080/api";

// 1. Lấy danh sách tất cả tỉnh/thành phố
export const getProvincesApi = async () => {
  try {
    const response = await API.get(`${proxy}/address/provinces`);
    return response.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

// 3. Lấy danh sách quận/huyện theo tỉnh
export const getDistrictsApi = async (provinceCode) => {
  try {
    const response = await API.get(
      `${proxy}/address/provinces/${provinceCode}/districts`
    );
    return response.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

// 5. Lấy danh sách xã/phường theo quận/huyện
export const getWardsApi = async (districtCode) => {
  try {
    const response = await API.get(
      `${proxy}/address/districts/${districtCode}/wards`
    );
    return response.data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã có lỗi xảy ra. Vui lòng thử lại.";
    throw new Error(errMsg);
  }
};

// // 7. Tìm kiếm tỉnh/thành phố
// export const searchProvincesApi = async (query, limit = 10) => {
//   try {
//     const response = await API.get(`${proxy}/address/search/provinces`, {
//       params: { q: query, limit },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response ? error.response.data.message : "Something went wrong"
//     );
//   }
// };

// // 8. Tìm kiếm quận/huyện trong một tỉnh
// export const searchDistrictsApi = async (query, provinceCode, limit = 10) => {
//   try {
//     const response = await API.get(`${proxy}/address/search/districts`, {
//       params: { q: query, province_code: provinceCode, limit },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response ? error.response.data.message : "Something went wrong"
//     );
//   }
// };

// // 9. Tìm kiếm xã/phường trong một quận/huyện
// export const searchWardsApi = async (query, districtCode, limit = 10) => {
//   try {
//     const response = await API.get(`${proxy}/address/search/wards`, {
//       params: { q: query, district_code: districtCode, limit },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response ? error.response.data.message : "Something went wrong"
//     );
//   }
// };

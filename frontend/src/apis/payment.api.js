import axios from "axios";
import API from "../config/axiosInterceptor";
const proxy = "http://localhost:8080/api";

export const createOrderVNPayApi = async (data, bankCode = "") => {
  console.log(data);
  try {
    if (!data || !data.total || !data.items || !Array.isArray(data.items)) {
      throw new Error("Dữ liệu đơn hàng không hợp lệ: cần có total và items");
    }
    const orderInfo = `Thanh toán ${data.quantity} sản phẩm: ${data.items
      .map((item) => (item?.productId ? item?.productId.name : item.name))
      .join(", ")}`;
    const response = await API.post(`${proxy}/payment/create_payment_url`, {
      amount: data.total,
      orderInfo,
      bankCode: "NCB",
      language: "vn",
    });
    window.location.href = response.data.data;
  } catch (error) {
    console.error("Lỗi khi tạo URL thanh toán VNPay:", error.message);
    throw new Error(`Không thể tạo URL thanh toán: ${error.message}`);
  }
};

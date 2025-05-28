import API from "../config/axiosInterceptor";

const proxy = "http://localhost:8080/api";

export const handleError = (error) => {
  const errMsg =
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    "Đã có lỗi xảy ra. Vui lòng thử lại.";
  throw new Error(errMsg);
};

export const addToCartApi = async (userId, productId, quantity, sessionID) => {
  try {
    const res = await API.post(`${proxy}/cart/add`, {
      userId,
      productId,
      quantity,
      sessionID,
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const getCartApi = async (userId, sessionID) => {
  try {
    const res = await API.post(`${proxy}/cart`, { userId, sessionID });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateItemQuantityApi = async (
  userId,
  sessionID,
  productId,
  quantity
) => {
  try {
    const res = await API.put(`${proxy}/cart/update`, {
      userId,
      sessionID,
      productId,
      quantity,
    });

    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const deleteCartApi = async (userId, sessionID, productId) => {
  try {
    const res = await API.post(`${proxy}/cart/remove`, {
      userId,
      sessionID,
      productId,
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

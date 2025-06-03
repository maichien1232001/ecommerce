export const handleError = (error) => {
  const errMsg =
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    "Đã có lỗi xảy ra. Vui lòng thử lại.";
  throw new Error(errMsg);
};

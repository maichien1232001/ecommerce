const STATUS_CONFIG = {
  order: {
    Pending: {
      color: "orange",
      text: "Chờ xử lý",
      icon: "ClockCircleOutlined",
    },
    Processing: {
      color: "blue",
      text: "Đang chuẩn bị hàng",
      icon: "LoadingOutlined",
    },
    Shipping: {
      color: "green",
      text: "Đang giao hàng",
      icon: "CheckCircleOutlined",
    },
    Delivered: { color: "green", text: "Đã giao", icon: "CheckCircleOutlined" },
    Cancelled: { color: "red", text: "Đã hủy", icon: "CloseCircleOutlined" },
  },
  payment: {
    Pending: { color: "orange", text: "Chờ thanh toán" },
    Completed: { color: "green", text: "Đã thanh toán" },
    Failed: { color: "red", text: "Thất bại" },
  },
};
export { STATUS_CONFIG };

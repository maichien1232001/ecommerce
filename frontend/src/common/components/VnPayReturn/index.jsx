import React, { useEffect, useState } from "react";
import { Result, Button, Card, Descriptions, Spin } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./VnPayReturn.scss";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../../redux/actions/order.actions";

const VNPayReturn = () => {
  const dispatch = useDispatch();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const responseCode = urlParams.get("vnp_ResponseCode");
    const transactionStatus = urlParams.get("vnp_TransactionStatus");
    const data = {
      amount: urlParams.get("vnp_Amount"),
      bankCode: urlParams.get("vnp_BankCode"),
      bankTranNo: urlParams.get("vnp_BankTranNo"),
      cardType: urlParams.get("vnp_CardType"),
      orderInfo: decodeURIComponent(urlParams.get("vnp_OrderInfo") || ""),
      payDate: urlParams.get("vnp_PayDate"),
      responseCode: responseCode,
      transactionNo: urlParams.get("vnp_TransactionNo"),
      transactionStatus: transactionStatus,
      txnRef: urlParams.get("vnp_TxnRef"),
    };

    setPaymentData(data);
    const success = responseCode === "00" && transactionStatus === "00";
    setIsSuccess(success);

    setLoading(false);
  }, []);

  const updateData = async (values) => {
    const orderId = localStorage.getItem("orderId");
    try {
      const data = {
        orderId: orderId,
        paymentStatus: "Completed",
      };
      await dispatch(updateOrderStatus(data));
      localStorage.removeItem("orderId");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      updateData();
    }
  }, [isSuccess]);

  const formatAmount = (amount) => {
    if (!amount) return "0";
    const actualAmount = parseInt(amount) / 100;
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(actualAmount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hour = dateString.substring(8, 10);
    const minute = dateString.substring(10, 12);
    const second = dateString.substring(12, 14);

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  const handleContinueShopping = () => {
    window.location.href = "/products";
  };

  if (loading) {
    return (
      <div className="vnpay-return-container">
        <div className="loading-wrapper">
          <Spin size="large" />
          <p>Đang xử lý kết quả thanh toán...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vnpay-return-container">
      <div className="result-wrapper">
        <Result
          icon={isSuccess ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          status={isSuccess ? "success" : "error"}
          title={isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại!"}
          subTitle={
            isSuccess
              ? "Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý."
              : "Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại."
          }
          extra={[
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              onClick={handleContinueShopping}
              key="continue"
            >
              Tiếp tục mua sắm
            </Button>,
          ]}
        />

        {paymentData && (
          <Card
            title="Thông tin giao dịch"
            className="transaction-details"
            style={{ maxWidth: 600, margin: "20px auto" }}
          >
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Mã giao dịch">
                {paymentData.transactionNo}
              </Descriptions.Item>
              <Descriptions.Item label="Mã đơn hàng">
                {paymentData.txnRef}
              </Descriptions.Item>
              <Descriptions.Item label="Số tiền">
                <strong
                  className={isSuccess ? "success-amount" : "error-amount"}
                >
                  {formatAmount(paymentData.amount)}
                </strong>
              </Descriptions.Item>
              <Descriptions.Item label="Thông tin đơn hàng">
                {paymentData.orderInfo}
              </Descriptions.Item>
              <Descriptions.Item label="Ngân hàng">
                {paymentData.bankCode} - {paymentData.cardType}
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian thanh toán">
                {formatDate(paymentData.payDate)}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <span className={isSuccess ? "status-success" : "status-error"}>
                  {isSuccess ? "Thành công" : "Thất bại"}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VNPayReturn;

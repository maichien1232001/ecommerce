import React, { useState, useMemo, useCallback, memo } from "react";
import { Card } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const PaymentCard3D = ({ payment }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const maskedCardNumber = useMemo(() => {
    if (!payment.cardNumber) return "**** **** **** ****";
    return payment.cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
  }, [payment.cardNumber]);

  const formattedExpirationDate = useMemo(() => {
    if (!payment.expirationDate) return "**/**";
    return dayjs(payment.expirationDate).format("MM/YY");
  }, [payment.expirationDate]);

  // Format địa chỉ ngắn gọn trên cùng 1 dòng
  const formatCompactAddress = useMemo(() => {
    if (!payment.billingAddress) return "";

    const { province, district, ward } = payment.billingAddress;
    const parts = [];

    if (ward) parts.push(ward.replace(/^(Phường|Xã|Thị trấn)\s+/, ""));
    if (district) parts.push(district.replace(/^(Quận|Huyện)\s+/, ""));
    if (province) parts.push(province.replace(/^(Tỉnh|Thành phố)\s+/, ""));

    return parts.join(", ");
  }, [payment.billingAddress]);

  return (
    <div className="payment-card-container">
      <div
        className={`payment-card ${isFlipped ? "flipped" : ""}`}
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        {/* Mặt trước */}
        <div className="card-front">
          <Card className="credit-card-front">
            <div className="card-header">
              <div className="card-logo">
                <CreditCardOutlined style={{ fontSize: 24, color: "white" }} />
                <span style={{ marginLeft: 8, fontWeight: "bold" }}>
                  CREDIT CARD
                </span>
              </div>
              <div className="card-chip">
                <div
                  style={{
                    width: 30,
                    height: 20,
                    background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                    borderRadius: 4,
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            </div>

            <div
              className="card-number"
              style={{
                margin: "20px 0",
                fontSize: "18px",
                letterSpacing: "2px",
              }}
            >
              {maskedCardNumber}
            </div>

            <div
              className="card-footer"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <div style={{ fontSize: "10px", color: "#ccc" }}>
                  TÊN CHỦ THẺ
                </div>
                <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {payment.cardHolderName || "CARD HOLDER"}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "10px", color: "#ccc" }}>
                  HẠN SỬ DỤNG
                </div>
                <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {formattedExpirationDate}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Mặt sau */}
        <div className="card-back">
          <Card className="credit-card-back">
            <div
              style={{ height: 40, background: "#000", margin: "0 -24px" }}
            ></div>

            <div style={{ margin: "20px 0" }}>
              <div style={{ fontSize: "10px", color: "#ccc", marginBottom: 8 }}>
                THÔNG TIN CHI TIẾT
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: 12,
                  borderRadius: 4,
                }}
              >
                <div style={{ marginBottom: 8 }}>
                  <strong>Chủ thẻ:</strong> {payment.cardHolderName}
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>CVV:</strong> ***
                </div>
                {payment.billingAddress && (
                  <>
                    <div style={{ marginBottom: 8 }}>
                      <strong>Địa chỉ:</strong> {payment.billingAddress.address}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <strong>Khu vực:</strong> {formatCompactAddress}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div
              style={{ textAlign: "center", fontSize: "10px", color: "#ccc" }}
            >
              Click để xem mặt trước
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default memo(PaymentCard3D);

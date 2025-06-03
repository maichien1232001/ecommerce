import React, { useMemo } from "react";
import { Card, Typography, Divider } from "antd";
import { CreditCardOutlined, StarFilled } from "@ant-design/icons";
import FormPaymentInfo from "../../../common/components/Form/FormPaymentInfo";
import { useSelector } from "react-redux";
import _ from "lodash";

const { Title } = Typography;

const PaymentMethodCard = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  onSubmit,
  loading,
  form,
}) => {
  const { user } = useSelector((state) => state?.auth || state.user);
  const { paymentInfo } = user;
  const paymentMethodDefault = _.find(paymentInfo, (item) => item.isDefault);

  const maskedCardNumber = useMemo(() => {
    if (!paymentMethodDefault?.cardNumber) return "**** **** **** ****";
    return paymentMethodDefault.cardNumber.replace(
      /(\d{4})(\d{4})(\d{4})(\d{4})/,
      "**** **** **** $4"
    );
  }, [paymentMethodDefault?.cardNumber]);

  return (
    <Card className="info-card payment-card">
      <div className="card-header">
        <div className="card-icon payment-icon">
          <CreditCardOutlined />
        </div>
        <div className="card-title-section">
          <Title level={4} className="card-title">
            Phương thức thanh toán
          </Title>
          <div className="card-subtitle">
            Chọn phương thức thanh toán phù hợp với bạn
          </div>
        </div>
      </div>

      <Divider className="card-divider" />

      <div className="payment-content">
        {!_.isEmpty(paymentInfo) ? (
          <Card
            size="small"
            className="payment-item-card"
            style={{
              marginBottom: 12,
              border: paymentMethodDefault?.isDefault
                ? "2px solid #1890ff"
                : "1px solid #d9d9d9",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <CreditCardOutlined
                  style={{ color: "#1890ff", fontSize: 20 }}
                />
                <div>
                  <div
                    style={{
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {maskedCardNumber}
                    {paymentMethodDefault?.isDefault && (
                      <>
                        <StarFilled
                          style={{ color: "#faad14", fontSize: 14 }}
                        />
                        <span
                          style={{
                            fontSize: "10px",
                            color: "#1890ff",
                            fontWeight: "normal",
                            padding: "0 4px",
                            backgroundColor: "#e6f7ff",
                            borderRadius: "2px",
                          }}
                        >
                          Mặc định
                        </span>
                      </>
                    )}
                  </div>
                  <div style={{ color: "#666", fontSize: "12px" }}>
                    {paymentMethodDefault?.cardHolderName}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <FormPaymentInfo
            handleSubmit={onSubmit}
            isEditing="add"
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            form={form}
          />
        )}
      </div>
    </Card>
  );
};

export default PaymentMethodCard;

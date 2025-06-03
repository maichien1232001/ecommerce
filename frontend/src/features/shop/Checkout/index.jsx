import React, { useEffect, useState } from "react";
import { Spin, Typography, Row, Col, Form } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import CustomerInfoCard from "./CustomerInfoCard";
import PaymentMethodCard from "./PaymentMethodCard";
import OrderSummaryCard from "./OrderSummaryCard";
import EmptyCheckout from "./EmptyCheckout";
import "./Checkout.scss";
import {
  clearBuyNowProduct,
  clearCheckoutItems,
} from "../../../redux/actions/product.action";
import { createOrderVNPayApi } from "../../../apis/payment.api";
import { addOrder } from "../../../redux/actions/order.actions";
import _ from "lodash";

const { Title } = Typography;

const Checkout = () => {
  const dispatch = useDispatch();
  const [formShippingAddress] = Form.useForm();
  const [formPaymentInfo] = Form.useForm();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("VNPay");
  const [formValue, setFormValue] = useState();
  const [process, setProcess] = useState(false);

  const { buyNowProduct, checkoutItems } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.auth || state?.user);

  const isMultipleItemsCheckout = checkoutItems && checkoutItems.length > 0;
  const isSingleProductCheckout = buyNowProduct && !isMultipleItemsCheckout;
  const hasItems = isSingleProductCheckout || isMultipleItemsCheckout;

  const handleSubmitShippingAdress = (values) => {
    console.log("Form ShippingAdress:", values);
  };
  const handleSubmitPaymentInfo = (values) => {
    console.log("Form PaymentInfo:", values);
  };

  const createOrder = async () => {
    try {
      const shippingAddressesDefault = _.find(
        user?.shippingAddresses,
        (item) => item.isDefault
      );
      const data = {
        products: JSON.parse(localStorage.getItem("orderInfo")),
        shippingAddress: _.isEmpty(shippingAddressesDefault)
          ? shippingAddressesDefault
          : formValue?.shippingValues,
        paymentMethod: "VNPay",
      };
      await dispatch(addOrder(data));
      setFormValue(null);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (values) => {
    localStorage.setItem("orderInfo", JSON.stringify(values));
    setProcess(true);
    try {
      const orderCreatedSuccessfully = await createOrder();
      if (!orderCreatedSuccessfully) {
        return;
      }

      const shippingValues = await formShippingAddress.validateFields();
      const paymentValues = await formPaymentInfo.validateFields();
      setFormValue({
        shippingValues: shippingValues,
        paymentValues: paymentValues,
      });

      handleSubmitShippingAdress(shippingValues);
      handleSubmitPaymentInfo(paymentValues);
      await createOrderVNPayApi(values);
      setProcess(false);
    } catch (error) {
      console.log("Validation or other error in handleSubmit:", error);
      setProcess(false);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearBuyNowProduct());
      dispatch(clearCheckoutItems());
    };
  }, []);

  if (!hasItems) {
    return <EmptyCheckout />;
  }

  return (
    <div className="checkout-container">
      <Spin
        spinning={process}
        indicator={<LoadingOutlined className="loading-icon" spin />}
        tip="Đang xử lý đơn hàng..."
      >
        <div className="checkout-header">
          <Title level={1} className="checkout-title">
            Hoàn tất đơn hàng
          </Title>
          <div className="checkout-subtitle">
            Vui lòng kiểm tra thông tin và hoàn tất đơn hàng của bạn
          </div>
        </div>

        <Row gutter={[32, 32]} className="checkout-content">
          <Col xs={24} lg={14} xl={15}>
            <div className="checkout-forms">
              <CustomerInfoCard
                onSubmit={handleSubmitShippingAdress}
                loading={process}
                user={user}
                formShippingAddress={formShippingAddress}
              />
              <PaymentMethodCard
                selectedPaymentMethod={selectedPaymentMethod}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
                onSubmit={handleSubmitPaymentInfo}
                loading={process}
                form={formPaymentInfo}
              />
            </div>
          </Col>

          <Col xs={24} lg={10} xl={9}>
            <div className="checkout-summary">
              <OrderSummaryCard
                buyNowProduct={buyNowProduct}
                checkoutItems={checkoutItems}
                isSingleProductCheckout={isSingleProductCheckout}
                isMultipleItemsCheckout={isMultipleItemsCheckout}
                onSubmit={handleSubmit}
                loading={process}
              />
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default Checkout;

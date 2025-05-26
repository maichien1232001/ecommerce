import { Tabs, Form, Spin } from "antd";
import React, { useState } from "react";
import "./Account.scss";
import Info from "./Info";
import Password from "./Password";
import DeliveryAddress from "./DeliveryAddress";
import { useDispatch, useSelector } from "react-redux";
import {
  managePaymentInfo,
  manageShippingAddresses,
} from "../../../redux/actions/user.actions";
import PaymentMethod from "./PaymentMethod";
import { notifyError, notifySuccess } from "../../../common/components/Tostify";

const Account = () => {
  const dispatch = useDispatch();
  const [generalForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [paymentForm] = Form.useForm();

  const { user } = useSelector((state) => state.auth || state.user);

  const onFinishAddress = (addressId, values, action) => {
    try {
      dispatch(
        manageShippingAddresses({
          addressId: addressId,
          action: action,
          addressData: values,
        })
      );
      notifySuccess(
        action === "add"
          ? "Thêm địa chỉ thanh toán thành công!"
          : action === "update"
          ? "Cập nhật thành công!"
          : "Xóa địa chỉ thanh toán thành công!"
      );
    } catch (error) {
      notifyError("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const onFinishPayment = (paymentId, values, action) => {
    try {
      dispatch(
        managePaymentInfo({
          paymentId: paymentId,
          action: action,
          paymentData: values,
        })
      );
      notifySuccess(
        action === "add"
          ? "Thêm phương thức thanh toán thành công!"
          : action === "update"
          ? "Cập nhật thành công!"
          : "Xóa phương thức thanh toán thành công!"
      );
    } catch (err) {
      notifyError("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const items = [
    {
      key: "1",
      label: "Thông tin chung",
      children: <Info generalForm={generalForm} user={user} />,
    },
    {
      key: "2",
      label: "Thay đổi mật khẩu",
      children: <Password passwordForm={passwordForm} user={user} />,
    },
    {
      key: "3",
      label: "Địa chỉ giao hàng",
      children: (
        <DeliveryAddress
          addressForm={addressForm}
          onFinishAddress={onFinishAddress}
          user={user}
        />
      ),
    },
    {
      key: "4",
      label: "Phương thức thanh toán",
      children: (
        <PaymentMethod
          paymentForm={paymentForm}
          onUpdatePaymentInfo={onFinishPayment}
          user={user}
        />
      ),
    },
  ];

  return (
    <div className="account-container">
      <Tabs
        defaultActiveKey="1"
        items={items}
        className="account-tabs"
        size="large"
      />
    </div>
  );
};

export default Account;

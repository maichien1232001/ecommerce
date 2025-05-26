import { Result, Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../../redux/actions/user.actions";

const Error403 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token =
    useSelector((state) => state.auths.accessToken) ||
    localStorage.getItem("authToken");
  const handleBackHome = () => {
    dispatch(getUserProfile(token));
    navigate("/");
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => handleBackHome()}>
          Back Home
        </Button>
      }
    />
  );
};

export default Error403;

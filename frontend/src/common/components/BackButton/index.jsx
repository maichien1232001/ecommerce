import React from "react";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./BackButton.scss";

const BackButton = ({ fallbackPath = -1, children = "Quay lại" }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(fallbackPath);
  };

  return (
    <Button
      type="default"
      icon={<LeftOutlined />}
      onClick={handleBackClick}
      className="custom-back-button"
    >
      {children}
    </Button>
  );
};

export default BackButton;

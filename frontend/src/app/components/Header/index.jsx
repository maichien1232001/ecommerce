import React, { useState } from "react";
import { Layout, Menu, Dropdown, Avatar, Badge, Select } from "antd";
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getColor, getFirstCharacter } from "../../../constants/avatar";

const { Header } = Layout;

const HeaderCommon = () => {
  const { t, i18n } = useTranslation("common");
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === "profile") {
      navigate("/admin/accounts");
    } else if (key === "settings") {
      navigate("/admin/settings");
    } else if (key === "logout") {
      console.log("Logging out...");
    }
  };

  const changeLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  const routes = [
    { path: "/admin/", label: t("dashboard") },
    { path: "/admin/users", label: t("users") },
    { path: "/admin/settings", label: t("settings") },
    { path: "/admin/products", label: t("products") },
    { path: "/admin/accounts", label: t("account") },
    // thêm routes khác nếu cần
  ];

  const pathName = window.location.pathname;
  const title = _.find(routes, (route) => route.path === pathName)?.label;

  const user = useSelector((state) => state.user.user);

  const userMenu = {
    items: [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: t("profile"),
      },
      {
        key: "settings",
        icon: <SettingOutlined />,
        label: t("settings"),
      },
      {
        type: "divider",
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: t("logout"),
      },
    ],
    onClick: handleMenuClick,
  };

  const languageMenu = {
    items: [
      {
        key: "en",
        label: "English",
        onClick: () => changeLanguage("en"),
      },
      {
        key: "vi",
        label: "Tiếng Việt",
        onClick: () => changeLanguage("vi"),
      },
    ],
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        background: "#fff",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: "bold" }}>{title}</div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* Notification */}
        <Badge count={5} size="small">
          <BellOutlined style={{ fontSize: 18 }} />
        </Badge>

        {/* Language Selector */}
        {/* Language Selector Dropdown */}
        <Dropdown menu={languageMenu} trigger={["click"]}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <GlobalOutlined />
            <span style={{ marginLeft: 4, fontSize: 12 }}>
              {i18n.language.toUpperCase()}
            </span>
          </div>
        </Dropdown>

        {/* User Menu */}
        <Dropdown menu={userMenu} trigger={["click"]}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Avatar
              size="small"
              src={user?.avatar}
              style={{
                backgroundColor: getColor(user.name),
                verticalAlign: "middle",
              }}
            >
              {getFirstCharacter(user.name)}
            </Avatar>
            <span style={{ marginLeft: 8 }}>{user.name}</span>

            <DownOutlined
              style={{
                marginLeft: 4,
                fontSize: 12,
              }}
            />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderCommon;

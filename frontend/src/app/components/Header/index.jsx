import React from "react";
import { Layout, Menu, Dropdown, Avatar, Badge, Button } from "antd";
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  GlobalOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  AppstoreOutlined,
  GiftOutlined,
  FireOutlined,
  PhoneOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getColor, getFirstCharacter } from "../../../constants/avatar";
import { checkAdmin } from "../../../constants/auth";

const { Header } = Layout;

const HeaderCommon = () => {
  const { t, i18n } = useTranslation("common");
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth || {});
  const isAuthenticated = !!user?._id;
  const isAdmin = isAuthenticated && checkAdmin(user);

  const handleMenuClick = ({ key }) => {
    if (key === "profile") {
      isAdmin ? navigate("/admin/accounts") : navigate("/accounts");
    } else if (key === "settings") {
      navigate("/admin/settings");
    } else if (key === "logout") {
      navigate("/login");
    }
  };

  const changeLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  const adminRoutes = [
    { path: "/admin/", label: t("dashboard") },
    { path: "/admin/users", label: t("users") },
    { path: "/admin/settings", label: t("settings") },
    { path: "/admin/products", label: t("products") },
    { path: "/admin/accounts", label: t("account") },
  ];

  const pathName = window.location.pathname;
  const title = isAdmin
    ? _.find(adminRoutes, (route) => route.path === pathName)?.label
    : "";

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

  const ecommerceNavItems = [
    {
      key: "home",
      icon: <AppstoreOutlined />,
      label: "Trang chủ",
      onClick: () => navigate("/"),
    },
    {
      key: "products",
      icon: <GiftOutlined />,
      label: "Cửa hàng",
      onClick: () => navigate("/products"),
    },
    {
      key: "deals",
      icon: <FireOutlined />,
      label: "Khuyến mãi",
      onClick: () => navigate("/deals"),
    },
    {
      key: "contact",
      icon: <PhoneOutlined />,
      label: "Liên hệ",
      onClick: () => navigate("/contact"),
    },
  ];

  const handleEcommerceMenuClick = ({ key }) => {
    const item = ecommerceNavItems.find((item) => item.key === key);
    if (item && item.onClick) {
      item.onClick();
    }
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: "bold", minWidth: "200px" }}>
        {isAdmin ? title : "LOGO"}
      </div>

      {!isAdmin && (
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Menu
            mode="horizontal"
            items={ecommerceNavItems}
            onClick={handleEcommerceMenuClick}
            style={{
              border: "none",
              backgroundColor: "transparent",
              fontSize: "14px",
              fontWeight: "500",
            }}
            selectedKeys={[
              ecommerceNavItems.find((item) => pathName.startsWith(item.path))
                ?.key || "home",
            ]}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          minWidth: "200px",
          justifyContent: "flex-end",
        }}
      >
        {isAuthenticated && (
          <Badge count={5} size="small">
            <BellOutlined style={{ fontSize: 18 }} />
          </Badge>
        )}

        {!isAdmin && (
          <Badge count={3} size="small">
            <ShoppingCartOutlined
              style={{ fontSize: 18, cursor: "pointer" }}
              onClick={() => navigate("/cart")}
            />
          </Badge>
        )}

        {!isAdmin && isAuthenticated && (
          <Badge count={2} size="small">
            <HeartOutlined
              style={{ fontSize: 18, cursor: "pointer" }}
              onClick={() => navigate("/wishlist")}
            />
          </Badge>
        )}

        <Dropdown menu={languageMenu} trigger={["click"]}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <GlobalOutlined />
            <span style={{ marginLeft: 4, fontSize: 12 }}>
              {i18n.language.toUpperCase()}
            </span>
            <DownOutlined style={{ marginLeft: 4, fontSize: 10 }} />
          </div>
        </Dropdown>

        {isAuthenticated ? (
          <Dropdown menu={userMenu} trigger={["click"]}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Avatar
                size="small"
                src={user?.avatar}
                style={{
                  backgroundColor: getColor(user?.name),
                  verticalAlign: "middle",
                }}
              >
                {getFirstCharacter(user?.name)}
              </Avatar>
              <span style={{ marginLeft: 8 }}>{user?.name}</span>

              <DownOutlined
                style={{
                  marginLeft: 4,
                  fontSize: 12,
                }}
              />
            </div>
          </Dropdown>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              type="default"
              icon={<UserAddOutlined />}
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </Button>
          </div>
        )}
      </div>
    </Header>
  );
};

export default HeaderCommon;

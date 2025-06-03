import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Avatar, Badge, Button } from "antd";
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  GlobalOutlined,
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
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { getColor, getFirstCharacter } from "../../../constants/avatar";
import CartHeaderIcon from "../../../features/shop/Cart/CartHeaderIcon";

const { Header } = Layout;

const checkAdmin = (user) => {
  return user?.role === "admin";
};

const HeaderShop = () => {
  const { t, i18n } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth || state?.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const wishlistProducts = wishlist?.products;
  const isAuthenticated = !!user?._id;
  const isAdmin = isAuthenticated && checkAdmin(user);

  const [currentSelectedKeys, setCurrentSelectedKeys] = useState([]);

  const ecommerceNavItems = [
    {
      key: "home",
      icon: <AppstoreOutlined />,
      label: "Trang chủ",
      path: "/",
    },
    {
      key: "products",
      icon: <GiftOutlined />,
      label: "Cửa hàng",
      path: "/products",
    },
    {
      key: "order",
      icon: <FireOutlined />,
      label: "Đơn hàng",
      path: "/order",
    },
    {
      key: "contact",
      icon: <PhoneOutlined />,
      label: "Liên hệ",
      path: "/contact",
    },
  ];

  useEffect(() => {
    const pathName = location.pathname;
    const sortedNavItems = [...ecommerceNavItems].sort(
      (a, b) => b.path.length - a.path.length
    );
    let matchedKey = null;
    if (pathName === "/") {
      matchedKey = "home";
    } else {
      const foundItem = sortedNavItems.find((item) =>
        pathName.startsWith(item.path)
      );
      if (foundItem) {
        matchedKey = foundItem.key;
      }
    }

    setCurrentSelectedKeys(matchedKey ? [matchedKey] : []);
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    if (key === "profile") {
      isAdmin ? navigate("/admin/accounts") : navigate("/accounts");
    } else if (key === "settings") {
      navigate("/admin/settings");
    } else if (key === "logout") {
      console.log("Logging out...");
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

  const currentPathName = location.pathname;
  const title = isAdmin
    ? _.find(adminRoutes, (route) => currentPathName.startsWith(route.path))
        ?.label || t("dashboard")
    : "LOGO";

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

  const handleEcommerceMenuClick = ({ key }) => {
    const item = ecommerceNavItems.find((item) => item.key === key);
    if (item && item.path) {
      navigate(item.path);
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
        {title}
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
            selectedKeys={currentSelectedKeys}
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

        {!isAdmin && <CartHeaderIcon />}

        {!isAdmin && isAuthenticated && (
          <Badge count={_.size(wishlistProducts)} size="small">
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

export default HeaderShop;

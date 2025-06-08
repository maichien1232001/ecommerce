import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import _ from "lodash";
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  HeartOutlined,
  TagOutlined,
  UserOutlined,
  SettingOutlined,
  ProductOutlined,
} from "@ant-design/icons";

import "./Navbar.scss";

const { Sider } = Layout;

const listMenu = [
  {
    key: 1,
    icon: <DashboardOutlined />,
    path: "/admin/",
    title: "Dashboard",
  },
  {
    key: 2,
    icon: <AppstoreOutlined />,
    path: "/admin/products",
    title: "Sản phẩm",
  },
  {
    key: 3,
    icon: <ShoppingCartOutlined />,
    path: "/admin/orders",
    title: "Đơn hàng",
  },
  {
    key: 4,
    icon: <ProductOutlined />,
    path: "/admin/category",
    title: "Phân loại sản phầm",
  },
  // {
  //   key: 5,
  //   icon: <HeartOutlined />,
  //   path: "/admin/wishlists",
  //   title: "Wish Lists",
  // },
  // {
  //   key: 6,
  //   icon: <TagOutlined />,
  //   path: "/admin/couponds",
  //   title: "Coupons",
  // },
  {
    key: 7,
    icon: <UserOutlined />,
    path: "/admin/accounts",
    title: "Tài khoản",
  },
  // {
  //   key: 8,
  //   icon: <SettingOutlined />,
  //   path: "/admin/settings",
  //   title: "Settings",
  // },
];

const NavBar = () => {
  const pathName = window.location.pathname;
  const menuItem = _.find(listMenu, (item) => item.path === pathName);
  const height = window.innerHeight;

  return (
    <Sider
      style={{ height: `${height}px` }}
      className="navbar-container"
      data-height={height}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={`${
          !_.isEmpty(menuItem) ? _.get(menuItem, "key") : 1
        }`}
        theme="dark"
        className="navbar-menu"
      >
        {_.map(listMenu, (item) => {
          return (
            <Menu.Item key={_.get(item, "key")} icon={_.get(item, "icon")}>
              <Link to={_.get(item, "path")}>{_.get(item, "title")}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default NavBar;

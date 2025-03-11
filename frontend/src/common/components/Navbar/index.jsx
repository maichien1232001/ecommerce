import React from "react";
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import _ from "lodash";
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  HeartOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./Navbar.scss";

const {Sider} = Layout;

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
    title: "Products",
  },
  {
    key: 3,
    icon: <ShoppingCartOutlined />,
    path: "/admin/orders",
    title: "Orders",
  },
  {
    key: 4,
    icon: <CommentOutlined />,
    path: "/admin/reviews",
    title: "Reviews",
  },
  {
    key: 5,
    icon: <HeartOutlined />,
    path: "/admin/wishlists",
    title: "Wish Lists",
  },
  {
    key: 6,
    icon: <TagOutlined />,
    path: "/admin/couponds",
    title: "Coupons",
  },
  {
    key: 7,
    icon: <UserOutlined />,
    path: "/admin/accounts",
    title: "Accounts",
  },
];

const NavBar = () => {
  const pathName = window.location.pathname;
  const menuItem = _.find(listMenu, (item) => item.path === pathName);
  const height = window.innerHeight;

  return (
    <Sider
      style={{height: `${height}px`}}
      className="navbar-container"
      data-height={height}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={`${
          !_.isEmpty(menuItem) ? _.get(menuItem, "key") : 1
        }`}
        theme="dark"
        style={styles.menu}
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

const styles = {
  layout: {
    height: "100%",
  },
  sider: {
    background: "#001529",
  },
  menu: {
    height: "100%",
  },
  content: {
    padding: "2rem",
    background: "#fff",
  },
};
export default NavBar;

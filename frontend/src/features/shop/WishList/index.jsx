import React from "react";
import { Button, Typography, Empty, Row, Col } from "antd";
import {} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./WishList.scss";
import ProductCard from "../ComponentCommon/ProductCard";

const { Title, Text } = Typography;

const Wishlist = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state?.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const wishlistProducts = wishlist?.products;
  const isAuthenticated = !!user?._id;

  if (!isAuthenticated) {
    return (
      <div className="wishlist-container">
        <div className="wishlist-header">
          <Title level={2} className="wishlist-title">
            Danh sách yêu thích
          </Title>
        </div>

        <div className="wishlist-empty">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ height: 120 }}
            description={
              <div className="empty-description">
                <Title level={4}>
                  Bạn cần đăng nhập để xem sản phẩm yêu thích
                </Title>
                <Text type="secondary">
                  Đăng nhập để lưu và quản lý các sản phẩm yêu thích của bạn
                </Text>
              </div>
            }
          >
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/login")}
              className="login-btn"
            >
              Đăng nhập ngay
            </Button>
          </Empty>
        </div>
      </div>
    );
  }

  if (!wishlistProducts || wishlistProducts.length === 0) {
    return (
      <div className="wishlist-container">
        <div className="wishlist-header">
          <Title level={2} className="wishlist-title">
            Danh sách yêu thích
          </Title>
        </div>

        <div className="wishlist-empty">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ height: 120 }}
            description={
              <div className="empty-description">
                <Title level={4}>Chưa có sản phẩm yêu thích</Title>
                <Text type="secondary">
                  Hãy thêm những sản phẩm bạn quan tâm vào danh sách yêu thích
                </Text>
              </div>
            }
          >
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/")}
              className="shop-btn"
            >
              Khám phá sản phẩm
            </Button>
          </Empty>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      {wishlistProducts.length > 0 && (
        <div className="wishlist-header">
          <Title level={2} className="wishlist-title">
            Danh sách yêu thích
          </Title>
          <Row gutter={[16, 16]}>
            {wishlistProducts.map((product) => (
              <Col key={product._id.$oid} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product?.product} favorite={true} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default Wishlist;

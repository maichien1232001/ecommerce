import React, { useEffect, useState } from "react";
import { Carousel, Row, Col, Typography, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import "./Home.scss";
import { getProducts } from "../../../apis/products";
import ProductCard from "../ComponentCommon/ProductCard";

const { Title, Text } = Typography;

const HomePage = () => {
  const [productsActive, setProductsActive] = useState([]);
  const [productsNew, setProductsNew] = useState([]);
  const [productsFeatured, setProductsFeatured] = useState([]);
  const [productsBestseller, setProductsBestseller] = useState([]);
  const [productsSale, setProductsSale] = useState([]);

  const fetchProductActive = async () => {
    const res = await getProducts({ status: "active", limit: 8 });
    setProductsActive(res?.products);
  };
  const fetchProductNew = async () => {
    const res = await getProducts({
      status: "active",
      specialTag: "new",
      limit: 8,
    });
    setProductsNew(res?.products);
  };
  const fetchProductFeatured = async () => {
    const res = await getProducts({
      status: "active",
      specialTag: "featured",
      limit: 8,
    });
    setProductsFeatured(res?.products);
  };
  const fetchProductBestSeller = async () => {
    const res = await getProducts({
      status: "active",
      specialTag: "bestseller",
      limit: 8,
    });
    setProductsBestseller(res?.products);
  };
  const fetchProductSale = async () => {
    const res = await getProducts({
      status: "active",
      specialTag: "sale",
      limit: 8,
    });
    setProductsSale(res?.products);
  };

  useEffect(() => {
    fetchProductActive();
    fetchProductNew();
    fetchProductFeatured();
    fetchProductBestSeller();
    fetchProductSale();
  }, []);

  return (
    <div className="homepage-container">
      <Carousel autoplay className="banner-carousel">
        <div className="banner-slide slide-1">
          <div className="banner-content">
            <Title level={1}>Siêu Sale Công Nghệ</Title>
            <Text>Giảm giá đến 50% cho tất cả các mặt hàng laptop và PC.</Text>
            <Button type="primary" size="large" className="mt-20">
              Khám Phá Ngay <ArrowRightOutlined />
            </Button>
          </div>
        </div>
        <div className="banner-slide slide-2">
          <div className="banner-content">
            <Title level={1}>Phụ Kiện Chất</Title>
            <Text>Nâng tầm trải nghiệm với các phụ kiện hàng đầu.</Text>
            <Button type="primary" size="large" className="mt-20">
              Xem Thêm <ArrowRightOutlined />
            </Button>
          </div>
        </div>
      </Carousel>

      {/* Section: Sản Phẩm Mới Nhất */}
      {productsNew.length > 0 && (
        <div className="product-section">
          <Title level={2} className="section-title">
            Sản Phẩm Mới Nhất
          </Title>
          <Row gutter={[16, 16]}>
            {productsNew.map((product) => (
              <Col key={product._id.$oid} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}

      {productsFeatured.length > 0 && (
        <div className="product-section">
          <Title level={2} className="section-title">
            Sản Phẩm Nổi Bật
          </Title>
          <Row gutter={[16, 16]}>
            {productsFeatured.map((product) => (
              <Col key={product._id.$oid} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}

      {productsBestseller.length > 0 && (
        <div className="product-section">
          <Title level={2} className="section-title">
            Bán Chạy Nhất
          </Title>
          <Row gutter={[16, 16]}>
            {productsBestseller.map((product) => (
              <Col key={product._id.$oid} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}

      {productsSale.length > 0 && (
        <div className="product-section">
          <Title level={2} className="section-title">
            Sản Phẩm Khuyến Mãi
          </Title>
          <Row gutter={[16, 16]}>
            {productsSale.map((product) => (
              <Col key={product._id.$oid} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
      {productsActive.length > 0 && (
        <div className="product-section">
          <Title level={2} className="section-title">
            Một số sản phẩm khác
          </Title>
          <Row gutter={[16, 16]}>
            {productsActive.map((product) => (
              <Col key={product._id.$oid} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default HomePage;

import React from "react";
import { Row, Col, Typography } from "antd";
import {
  ShopOutlined,
  SafetyCertificateOutlined,
  CreditCardOutlined,
  TruckOutlined,
  CustomerServiceOutlined,
  HeartFilled,
  StarFilled,
} from "@ant-design/icons";

import "./Footer.scss";
import { useSelector } from "react-redux";
import _ from "lodash";
import dayjs from "dayjs";

const { Title, Text, Link } = Typography;

const Footer = () => {
  const { category } = useSelector((state) => state.category);
  const companyLinks = [
    { title: "Về cửa hàng", href: "#" },
    { title: "Tin tức", href: "#" },
    { title: "Liên hệ", href: "#" },
    { title: "Điều khoản sử dụng", href: "#" },
    { title: "Chính sách bảo mật", href: "#" },
  ];

  const supportLinks = [
    { title: "Hướng dẫn mua hàng", href: "#" },
    { title: "Chính sách đổi trả", href: "#" },
    { title: "Chính sách bảo hành", href: "#" },
    { title: "Phương thức thanh toán", href: "#" },
    { title: "Vận chuyển", href: "#" },
    { title: "FAQ", href: "#" },
  ];

  const categoryLinks = _.map(category, (item) => ({
    title: _.capitalize(item.name),
    href: "#",
  }));

  const startYear = 2025;
  const currentYear = dayjs().year();
  const displayYear =
    currentYear > startYear ? `${startYear}–${currentYear}` : `${startYear}`;

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div className="footer-brand">
              <div className="brand-logo">
                <ShopOutlined className="brand-icon" />
                <Title level={2} className="brand-title">
                  TechStore
                </Title>
              </div>
              <Text className="brand-description">
                Chuyên cung cấp các sản phẩm công nghệ chính hãng với giá tốt
                nhất thị trường. Uy tín - Chất lượng - Bảo hành tốt.
              </Text>
            </div>
          </Col>

          <Col span={6}>
            <Title level={4} className="footer-section-title">
              Về Công Ty
            </Title>
            <div className="footer-links">
              {companyLinks.map((link, index) => (
                <Link key={index} href={link.href} className="footer-link">
                  {link.title}
                </Link>
              ))}
            </div>
          </Col>

          <Col span={6}>
            <Title level={4} className="footer-section-title">
              Hỗ Trợ
            </Title>
            <div className="footer-links">
              {supportLinks.map((link, index) => (
                <Link key={index} href={link.href} className="footer-link">
                  {link.title}
                </Link>
              ))}
            </div>
          </Col>

          <Col span={6}>
            <Title level={4} className="footer-section-title">
              Danh Mục
            </Title>
            <div className="footer-links">
              {categoryLinks.map((link, index) => (
                <Link key={index} href={link.href} className="footer-link">
                  {link.title}
                </Link>
              ))}
            </div>
          </Col>
        </Row>

        <div className="features-section">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <div className="feature-item">
                <TruckOutlined className="feature-icon" />
                <Title level={5} className="feature-title">
                  Giao Hàng Nhanh
                </Title>
                <Text className="feature-desc">
                  Giao hàng trong 2-4h tại TP.Hà Nội
                </Text>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div className="feature-item">
                <SafetyCertificateOutlined className="feature-icon" />
                <Title level={5} className="feature-title">
                  Bảo Hành Chính Hãng
                </Title>
                <Text className="feature-desc">Bảo hành 12-24 tháng</Text>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div className="feature-item">
                <CreditCardOutlined className="feature-icon" />
                <Title level={5} className="feature-title">
                  Thanh Toán Đa Dạng
                </Title>
                <Text className="feature-desc">Hỗ trợ nhiều phương thức</Text>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div className="feature-item">
                <CustomerServiceOutlined className="feature-icon" />
                <Title level={5} className="feature-title">
                  Hỗ Trợ 24/7
                </Title>
                <Text className="feature-desc">Tư vấn miễn phí mọi lúc</Text>
              </div>
            </Col>
          </Row>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <Text className="copyright">
              © {displayYear} TechStore. Được phát triển{" "}
              <HeartFilled className="heart-icon" /> bởi Gil
            </Text>

            <div className="rating-badge">
              <StarFilled className="star-icon" />
              <StarFilled className="star-icon" />
              <StarFilled className="star-icon" />
              <StarFilled className="star-icon" />
              <StarFilled className="star-icon" />
              <Text className="rating-text">4.8/5 từ 10,000+ đánh giá</Text>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

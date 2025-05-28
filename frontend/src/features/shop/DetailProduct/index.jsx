import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { viewProduct } from "../../../redux/actions/product.action";
import {
  Carousel,
  Spin,
  Row,
  Col,
  Typography,
  Card,
  Divider,
  Tag,
  Button,
  InputNumber,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { optionTags, statusOptionsBase } from "../../../constants/products";
import BackButton from "../../../common/components/BackButton";
import "./DetailProduct.scss";
import { v4 as uuidv4 } from "uuid";
import { notifyError, notifySuccess } from "../../../common/components/Tostify";
import { addToCart } from "../../../redux/actions/cart.actions";

const { Title, Text, Paragraph } = Typography;

const DetailProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth || state?.user);
  const isAuthenticated = !!user?._id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const fetchProductById = async () => {
    setLoading(true);
    try {
      const response = await dispatch(viewProduct(productId));
      setProduct(response);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductById();
    }
  }, [productId, dispatch]);

  const handleAddToCart = async () => {
    try {
      let sessionID = localStorage.getItem("sessionID");

      if (!isAuthenticated) {
        if (!sessionID) {
          sessionID = uuidv4();
          localStorage.setItem("sessionID", sessionID);
        }

        await dispatch(addToCart(null, productId, quantity, sessionID));
      } else {
        await dispatch(addToCart(user._id, productId, quantity, null));
      }

      notifySuccess("Sản phẩm đã được thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      notifyError("Không thể thêm sản phẩm vào giỏ hàng.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Spin size="large" tip="Đang tải sản phẩm..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Title level={3} type="danger">
          Không tìm thấy sản phẩm hoặc có lỗi xảy ra!
        </Title>
      </div>
    );
  }

  const specifications = product.specifications
    ? Object.values(product.specifications)[0]
    : {};

  const translatedSpecifications = [];
  if (specifications) {
    for (const key in specifications) {
      if (key === "_id") continue;

      let label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      let value = specifications[key];

      switch (key) {
        case "cpu":
          label = "CPU";
          break;
        case "ram":
          label = "RAM";
          break;
        case "storage":
          label = "Bộ nhớ trong";
          break;
        case "screen":
          label = "Màn hình";
          break;
        case "battery":
          label = "Pin";
          break;
        case "operatingSystem":
          label = "Hệ điều hành";
          break;
        case "color":
          label = "Màu sắc";
          break;
        case "weight":
          label = "Trọng lượng";
          break;
        case "connectivity":
          label = "Kết nối";
          break;
        default:
          break;
      }
      translatedSpecifications.push({ label, value });
    }
  }

  const getTagLabel = (value) => {
    const tag = optionTags.find((opt) => opt.value === value);
    return tag ? tag.label : "";
  };

  const getStatusLabel = (value) => {
    const status = statusOptionsBase.find((opt) => opt.value === value);
    return status ? status.label : "";
  };

  return (
    <div className="detail-product-container">
      <BackButton fallbackPath="/products">Quay lại</BackButton>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card bordered={false} className="product-image-carousel-card">
            {product.status && (
              <Tag
                className={`product-status-on-image ${
                  product.status === "active" ? "active" : "inactive"
                }`}
              >
                {getStatusLabel(product.status)}
              </Tag>
            )}

            {product.images && product.images.length > 0 ? (
              <Carousel autoplay arrows infinite={true} dotPosition="bottom">
                {product.images.map((image, index) => (
                  <div key={index} className="carousel-image-wrapper">
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="product-detail-image"
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className="no-image-placeholder">Không có ảnh</div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card bordered={false} className="product-info-card">
            <Title level={2} className="product-name">
              {product.name}
            </Title>
            <Text strong className="product-brand-tag">
              Thương hiệu: {product.brand || "Không xác định"}
            </Text>
            {product.specialTag && product.specialTag !== "basic" && (
              <Tag className={`special-tag ${product.specialTag}`}>
                {getTagLabel(product.specialTag)}
              </Tag>
            )}
            <Divider />

            <div className="price-section">
              <Title level={3} className="product-price">
                {formatCurrency(product.price)}
              </Title>
            </div>

            <Divider />

            <Paragraph className="product-description">
              <Title level={4}>Mô tả sản phẩm:</Title>
              {product.description}
            </Paragraph>

            <Divider />

            <Title level={4}>Thông số kỹ thuật:</Title>
            <div className="specifications-list">
              {translatedSpecifications.map((spec, index) => (
                <p key={index}>
                  <Text strong>{spec.label}:</Text> <Text>{spec.value}</Text>
                </p>
              ))}
              <p>
                <Text strong>Tồn kho:</Text> <Text>{product.stock}</Text>
              </p>
            </div>

            <Divider />

            <div className="product-actions">
              <div className="quantity-selector">
                <Text strong>Số lượng:</Text>
                <InputNumber
                  min={1}
                  max={product.stock} // Set max quantity to product stock
                  defaultValue={1}
                  value={quantity}
                  onChange={(value) => setQuantity(value)}
                  className="quantity-input"
                />
              </div>
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart} // Call handleAddToCart on click
                disabled={product.stock === 0} // Disable if out of stock
              >
                Thêm vào giỏ hàng
              </Button>
              <Button size="large" className="buy-now-button">
                Mua ngay
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DetailProduct;

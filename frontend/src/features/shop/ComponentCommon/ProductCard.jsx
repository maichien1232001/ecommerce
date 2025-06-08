import React from "react";
import { Button, Card, Tag, Typography, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { optionTags } from "../../../constants/products";
import { notifyError, notifySuccess } from "../../../common/components/Tostify";
import { addToCart } from "../../../redux/actions/cart.actions";
import { setBuyNowProduct } from "../../../redux/actions/product.action";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import {
  addProductToWishList,
  removeProductFromWishList,
} from "../../../redux/actions/wishlist.actions";

const { Title, Text } = Typography;
const { Meta } = Card;

const ProductCard = (props) => {
  const { product, favorite } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.user);
  const isAuthenticated = !!user?._id;
  const isOutOfStock = product.stock === 0;
  const isActive = product.status === "inactive";
  const isDiscontinued = product.status === "discontinued";

  const isUnavailable = isOutOfStock || isActive || isDiscontinued;

  const getTagLabel = (value) => {
    const tag = optionTags.find((opt) => opt.value === value);
    return tag ? tag.label : "";
  };

  const handleAddToCart = async (product) => {
    if (isOutOfStock) {
      notifyError("Sản phẩm đã hết hàng!");
      return;
    }
    if (isActive || isDiscontinued) {
      notifyError("Sản phẩm đã ngừng bán!");
      return;
    }

    try {
      let sessionID = localStorage.getItem("sessionID");

      if (!isAuthenticated) {
        if (!sessionID) {
          sessionID = uuidv4();
          localStorage.setItem("sessionID", sessionID);
        }

        await dispatch(addToCart(null, product?._id, 1, sessionID));
      } else {
        await dispatch(addToCart(user._id, product?._id, 1, null));
      }

      notifySuccess("Sản phẩm đã được thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      notifyError("Không thể thêm sản phẩm vào giỏ hàng.");
    }
  };

  const handleAddWishList = (product) => {
    dispatch(addProductToWishList(product?._id));
  };

  const handleRemoveWistList = () => {
    dispatch(removeProductFromWishList(product?._id));
  };

  const handleBuyNow = (product) => {
    if (isOutOfStock) {
      notifyError("Sản phẩm đã hết hàng!");
      return;
    }
    if (isActive || isDiscontinued) {
      notifyError("Sản phẩm đã ngừng bán!");
      return;
    }

    handleAddToCart(product);
    dispatch(setBuyNowProduct(product));
    if (!isAuthenticated) {
      Modal.confirm({
        title: "Yêu cầu đăng nhập",
        content:
          "Bạn cần đăng nhập để mua hàng. Bạn có muốn đăng nhập ngay không?",
        okText: "Đăng nhập",
        cancelText: "Hủy",
        onOk: () => {
          navigate("/login", { state: { from: "/checkout" } });
        },
      });
      return;
    } else {
      navigate("/checkout");
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        className={`product-card ${isUnavailable ? "unavailable" : ""}`}
        hoverable={!isUnavailable}
        style={{
          opacity: isUnavailable ? 0.6 : 1,
          cursor: isUnavailable ? "default" : "pointer",
        }}
        cover={
          <div style={{ position: "relative" }}>
            <img
              alt={product.name}
              src={product.images?.[0] || "https://via.placeholder.com/300"}
              style={{
                filter: isUnavailable ? "grayscale(50%)" : "none",
              }}
            />
            {isUnavailable && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Tag
                  color="red"
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "8px 16px",
                    borderRadius: "4px",
                  }}
                >
                  {isOutOfStock ? "Hết hàng" : "Ngừng bán"}
                </Tag>
              </div>
            )}
          </div>
        }
        actions={[
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleBuyNow(product);
            }}
            type="primary"
            key="buy"
            disabled={isUnavailable}
          >
            Mua ngay
          </Button>,
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            key="add-to-cart"
            disabled={isUnavailable}
          >
            Thêm vào giỏ
          </Button>,
        ]}
      >
        {product.specialTag && !isUnavailable && (
          <Tag className={`special-tag ${product.specialTag}`}>
            {getTagLabel(product.specialTag)}
          </Tag>
        )}

        {/* Status tags positioned at top left */}
        {isOutOfStock && (
          <Tag
            color="red"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 10,
              fontWeight: "bold",
            }}
          >
            Hết hàng
          </Tag>
        )}
        {(isActive || isDiscontinued) && (
          <Tag
            color="red"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 10,
              fontWeight: "bold",
            }}
          >
            Ngừng bán
          </Tag>
        )}

        {/* Wishlist button logic */}
        {favorite ? (
          <Button
            icon={<HeartFilled />}
            shape="circle"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "red",
              zIndex: 10,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveWistList();
            }}
          />
        ) : (
          <Button
            icon={<HeartOutlined />}
            shape="circle"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 10,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleAddWishList(product);
            }}
          />
        )}

        {typeof product.isFavorite === "boolean" ? (
          product.isFavorite ? (
            <Button
              icon={<HeartFilled />}
              shape="circle"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "red",
                zIndex: 10,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveWistList();
              }}
            />
          ) : (
            <Button
              icon={<HeartOutlined />}
              shape="circle"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 10,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleAddWishList(product);
              }}
            />
          )
        ) : null}

        <Meta
          title={
            <span style={{ color: isUnavailable ? "#999" : "inherit" }}>
              {product.name}
            </span>
          }
          description={
            <>
              <Text
                className="product-brand"
                style={{ color: isUnavailable ? "#999" : "inherit" }}
              >
                {product.brand}
              </Text>
              <Title
                level={4}
                className="product-price"
                style={{ color: isUnavailable ? "#999" : "inherit" }}
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </Title>
            </>
          }
        />
      </Card>
    </>
  );
};

export default ProductCard;

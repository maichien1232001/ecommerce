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
  const { user } = useSelector((state) => state.auth || state?.user);
  const isAuthenticated = !!user?._id;

  const getTagLabel = (value) => {
    const tag = optionTags.find((opt) => opt.value === value);
    return tag ? tag.label : "";
  };

  const handleAddToCart = async (product) => {
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

  return (
    <>
      <Card
        onClick={() => navigate(`/product/${product._id}`)}
        className="product-card"
        hoverable
        cover={
          <img
            alt={product.name}
            src={product.images?.[0] || "https://via.placeholder.com/300"}
          />
        }
        actions={[
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleBuyNow(product);
            }}
            type="primary"
            key="buy"
          >
            Mua ngay
          </Button>,
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            key="add-to-cart"
          >
            Thêm vào giỏ
          </Button>,
        ]}
      >
        {product.specialTag && (
          <Tag className={`special-tag ${product.specialTag}`}>
            {getTagLabel(product.specialTag)}
          </Tag>
        )}
        {favorite ? (
          <Button
            icon={<HeartFilled />}
            shape="circle"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "red",
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
            style={{ position: "absolute", top: "10px", right: "10px" }}
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
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={(e) => {
                e.stopPropagation();
                handleAddWishList(product);
              }}
            />
          )
        ) : null}

        <Meta
          title={product.name}
          description={
            <>
              <Text className="product-brand">{product.brand}</Text>
              <Title level={4} className="product-price">
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

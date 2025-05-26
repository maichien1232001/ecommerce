import React from "react";
import { Button, Card, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { optionTags } from "../../../constants/products";

const { Title, Text } = Typography;
const { Meta } = Card;

const ProductCard = (props) => {
  const { product } = props;
  const navigate = useNavigate();
  const getTagLabel = (value) => {
    const tag = optionTags.find((opt) => opt.value === value);
    return tag ? tag.label : "";
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
          <Button type="primary" key="buy">
            Mua ngay
          </Button>,
          <Button key="add-to-cart">Thêm vào giỏ</Button>,
        ]}
      >
        {product.specialTag && (
          <Tag className={`special-tag ${product.specialTag}`}>
            {getTagLabel(product.specialTag)}
          </Tag>
        )}
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

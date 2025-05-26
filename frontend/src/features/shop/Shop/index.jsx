import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Pagination,
  Empty,
  Typography,
  Button,
  Spin,
} from "antd";

import BrandFilter from "../../admin/Products/FilterProduct/FilterByBrand";
import FilterByCategory from "../../admin/Products/FilterProduct/FilterByCategory";
import ProductNameFilter from "../../admin/Products/FilterProduct/FilterByName";
import StatusFilter from "../../admin/Products/FilterProduct/FilterByStatus";
import StockFilter from "../../admin/Products/FilterProduct/FilterByStock";
import TagFilter from "../../admin/Products/FilterProduct/FilterByTags";

import "./Shop.scss";
import { getListProducts } from "../../../redux/actions/product.action";
import { updateFilter } from "../../../redux/actions/product.action";
import ProductCard from "../ComponentCommon/ProductCard";

const { Text } = Typography;
const PRODUCTS_PER_PAGE = 12;

const ShopPage = () => {
  const dispatch = useDispatch();
  const { products, pagination, loading, filter } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = {
      ...filter,
      page: currentPage,
      limit: PRODUCTS_PER_PAGE,
    };
    dispatch(getListProducts(params));
  }, [dispatch, filter, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleClearFilters = () => {
    dispatch(updateFilter({}));
  };

  return (
    <>
      <div className="shop-page-container">
        <Row gutter={32}>
          <Col xs={24} lg={6}>
            <Card
              title="Bộ Lọc"
              className="filter-sidebar"
              extra={
                <Button onClick={handleClearFilters} type="link">
                  Xóa tất cả
                </Button>
              }
            >
              <ProductNameFilter />
              <hr className="filter-divider" />
              <FilterByCategory />
              <hr className="filter-divider" />
              <BrandFilter />
              <hr className="filter-divider" />
              <TagFilter label="Nhãn sản phẩm" />
              <hr className="filter-divider" />
              <StockFilter label="Tình trạng kho" />
              <hr className="filter-divider" />
              <StatusFilter label="Trạng thái bán" />
            </Card>
          </Col>

          <Col xs={24} lg={18}>
            <Spin spinning={loading} tip="Đang tải sản phẩm...">
              <div className="main-content">
                <div className="shop-header">
                  <Text>
                    Hiển thị <strong>{products?.length || 0}</strong> trên tổng
                    số <strong>{pagination?.totalCount || 0}</strong> sản phẩm
                  </Text>
                </div>

                {products && products.length > 0 ? (
                  <>
                    <Row gutter={[16, 16]}>
                      {products.map((product) => (
                        <Col key={product._id} xs={24} sm={12} md={8}>
                          <div className="product-card-container">
                            <ProductCard product={product} />
                          </div>
                        </Col>
                      ))}
                    </Row>
                    <div className="pagination-container">
                      <Pagination
                        current={currentPage}
                        pageSize={PRODUCTS_PER_PAGE}
                        total={pagination?.totalCount}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                      />
                    </div>
                  </>
                ) : (
                  !loading && (
                    <div className="empty-state-container">
                      <Empty description="Không tìm thấy sản phẩm nào phù hợp" />
                    </div>
                  )
                )}
              </div>
            </Spin>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ShopPage;

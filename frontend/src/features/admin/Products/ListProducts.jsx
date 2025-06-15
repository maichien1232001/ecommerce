import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import ImportProducts from "./Actions/ImportProducts";
import TableCommon from "../../../common/components/Table";
import {
  deleteProduct,
  getListProducts,
  updateFilter,
  viewProduct,
} from "../../../redux/actions/product.action";
import AddProduct from "./Actions/AddProduct";
import ViewProduct from "./Actions/ViewProduct";
import EditProduct from "./Actions/EditProduct";
import DateFieldFilter from "../../../common/components/Date";
import StockFilter from "./FilterProduct/FilterByStock";
import ProductNameFilter from "./FilterProduct/FilterByName";
import { Card, Col, Row, Tooltip } from "antd";
import FilterByCategory from "./FilterProduct/FilterByCategory";
import StatusFilter from "./FilterProduct/FilterByStatus";
import BrandFilter from "./FilterProduct/FilterByBrand";
import TagFilter from "./FilterProduct/FilterByTags";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { getColumns } from "../../../common/components/Table/constant";

export const ListProducts = () => {
  const dispatch = useDispatch();

  const { products, filter, loading, pagination } = useSelector(
    (state) => state.products
  );

  const [isOpenViewProduct, setIsOpenViewProduct] = useState(false);
  const [isOpenEditProduct, setIsOpenEditProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const viewProductById = async (id) => {
    const product = await dispatch(viewProduct(id));
    setSelectedProduct(product);
    setIsOpenViewProduct(true);
  };

  const handleActionClick = (key, record) => {
    if (key === "view") {
      viewProductById(record._id);
    }
    if (key === "edit") {
      setSelectedProduct(record);
      setIsOpenEditProduct(true);
    }
    if (key === "delete") {
      dispatch(deleteProduct(record._id));
    }
  };

  useEffect(() => {
    dispatch(getListProducts(filter));
  }, [dispatch, filter]);

  const handleChangeDate = useCallback(
    (range) => {
      let newFilters = { ...filter };

      Object.entries(range).forEach(([key, value]) => {
        if (value === "") {
          delete newFilters[key];
        } else {
          newFilters[key] = value;
        }
      });
      dispatch(updateFilter(newFilters));
    },
    [dispatch, filter]
  );

  return (
    <div className="list-products">
      <div className="header-action-product">
        <Card className="header-action-product-card">
          <div className="header-btn-product-card">
            <div className="header-btn-wrapper">
              <ImportProducts />
              <AddProduct />
            </div>

            <div className="header-filter">
              <ProductNameFilter />
              <Tooltip
                title={`${
                  showAdvancedFilters
                    ? "Ẩn bộ lọc nâng cao"
                    : "Hiện bộ lọc nâng cao"
                }`}
              >
                <div
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  {!showAdvancedFilters ? (
                    <DownOutlined className="filter-toggle-icon" />
                  ) : (
                    <UpOutlined className="filter-toggle-icon" />
                  )}
                </div>
              </Tooltip>
            </div>
          </div>
          {showAdvancedFilters && (
            <div className="advanced-filter">
              <div style={{ marginBottom: 8 }}>
                <strong>Bộ lọc nâng cao</strong>
              </div>
              <div>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={6}>
                    <StockFilter />
                  </Col>
                  <Col xs={24} md={6}>
                    <FilterByCategory />
                  </Col>
                  <Col xs={24} md={6}>
                    <BrandFilter />
                  </Col>
                  <Col xs={24} md={6}>
                    <StatusFilter />
                  </Col>

                  <Col xs={24} md={6}>
                    <TagFilter />
                  </Col>
                  <Col xs={24} md={6}>
                    <DateFieldFilter
                      field="createdAt"
                      data={products}
                      label="Ngày tạo:"
                      onDateChange={(range) => {
                        handleChangeDate(range);
                      }}
                    />
                  </Col>
                  <Col xs={24} md={6}>
                    <DateFieldFilter
                      field="updatedAt"
                      data={products}
                      label="Ngày cập nhật:"
                      onDateChange={(range) => {
                        handleChangeDate(range);
                      }}
                    />
                  </Col>
                  <Col xs={24} md={6} />
                </Row>
              </div>
            </div>
          )}
        </Card>
      </div>
      <Card className="card-table-product">
        <TableCommon
          title={"Danh sách sản phẩm"}
          className="table-product"
          data={products}
          loading={loading}
          handleActionClick={handleActionClick}
          columns={getColumns(
            handleActionClick,
            _.get(filter, "page"),
            _.get(filter, "limit")
          )}
          pagination={{
            current: _.get(filter, "page"),
            pageSize: _.get(filter, "limit"),
            total: _.get(pagination, "totalCount"),
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50", "100"],
            showTotal: (total) => `Tổng ${total} sản phẩm`,
          }}
          onChange={(pagination) => {
            dispatch(
              updateFilter({
                ...filter,
                page: pagination.current,
                limit: pagination.pageSize,
              })
            );
          }}
        />

        <ViewProduct
          visible={isOpenViewProduct}
          onClose={() => setIsOpenViewProduct(false)}
          product={selectedProduct}
        />
      </Card>
      <EditProduct
        visible={isOpenEditProduct}
        onClose={() => setIsOpenEditProduct(false)}
        product={selectedProduct}
      />
    </div>
  );
};

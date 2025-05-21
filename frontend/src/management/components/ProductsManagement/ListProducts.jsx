import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import ImportProducts from "./ImportProducts";
import TableCommon from "../../../common/components/Table";
import {
  deleteProduct,
  getListProducts,
  updateFilter,
  viewProduct,
} from "../../../redux/actions/product.action";
import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";
import EditProduct from "./EditProduct";
import DateFieldFilter from "../../../common/components/Date";
import StockFilter from "./FilterProduct/FilterByStock";
import ProductNameFilter from "./FilterProduct/FilterByName";
import { Card } from "antd";
import FilterByCategory from "./FilterProduct/FilterByCategory";

export const ListProducts = () => {
  const dispatch = useDispatch();

  const { products, filter, loading } = useSelector((state) => state.products);

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

  const { page, limit } = filter;

  useEffect(() => {
    dispatch(getListProducts(filter));
  }, [dispatch, filter]);

  console.log(11111111111);

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

  const handleFilterByName = useCallback(
    (value) => {
      const newFilters = { ...filter, name: value };
      dispatch(updateFilter(newFilters));
    },
    [dispatch, filter]
  );

  const handleFilterByStock = useCallback(
    (value) => {
      const newFilters = { ...filter, inStock: value };
      dispatch(updateFilter(newFilters));
    },
    [dispatch, filter]
  );

  return (
    <div className="list-products">
      <div className="header-action-product">
        <Card className="header-action-product-card">
          <div>
            <ImportProducts />
          </div>
          <div className="header-filter">
            <div className="basic-filter">
              <ProductNameFilter onFilter={handleFilterByName} />
              <StockFilter onFilter={handleFilterByStock} />
              <FilterByCategory />
            </div>
            <div className="advanced-filter">
              <DateFieldFilter
                field="createdAt"
                data={products}
                label="Ngày tạo:"
                onDateChange={(range) => {
                  handleChangeDate(range);
                }}
              />

              <DateFieldFilter
                field="updatedAt"
                data={products}
                label="Ngày cập nhật:"
                onDateChange={(range) => {
                  handleChangeDate(range);
                }}
              />
            </div>
          </div>
          <div className="add-product">
            <AddProduct />
          </div>
        </Card>
      </div>

      <TableCommon
        title={"Danh sách sản phẩm"}
        data={products}
        loading={loading}
        handleActionClick={handleActionClick}
      />

      <ViewProduct
        visible={isOpenViewProduct}
        onClose={() => setIsOpenViewProduct(false)}
        product={selectedProduct}
      />
      <EditProduct
        visible={isOpenEditProduct}
        onClose={() => setIsOpenEditProduct(false)}
        product={selectedProduct}
      />
    </div>
  );
};

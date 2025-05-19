import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import ImportProducts from "./ImportProducts";
import TableCommon from "../../../common/components/Table";
import {
  getListProducts,
  viewProduct,
} from "../../../redux/actions/product.action";
import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";

export const ListProducts = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);

  const [isOpenViewProduct, setIsOpenViewProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const viewProductById = async (id) => {
    const product = await dispatch(viewProduct(id));
    setSelectedProduct(product);
    setIsOpenViewProduct(true);
  };

  const handleActionClick = (key, record) => {
    if (key === "view") {
      viewProductById(record._id);
    }
    // xử lý edit, delete ...
  };

  useEffect(() => {
    dispatch(
      getListProducts({ page: productState.page, limit: productState.limit })
    );
  }, [dispatch, productState.page, productState.limit]);

  return (
    <div style={{ overflow: "hidden" }}>
      <ImportProducts />
      <AddProduct />
      <TableCommon
        title={"Danh sách sản phẩm"}
        data={_.get(productState, "products")}
        loading={_.get(productState, "loading")}
        handleActionClick={handleActionClick}
      />

      <ViewProduct
        visible={isOpenViewProduct}
        onClose={() => setIsOpenViewProduct(false)}
        product={selectedProduct}
      />
    </div>
  );
};

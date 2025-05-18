import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import ImportProducts from "./ImportProducts";
import TableCommon from "../../../common/components/Table";
import { getListProducts } from "../../../redux/actions/product.action";
import AddProduct from "./AddProduct";

export const ListProducts = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      getListProducts({ page: productState.page, limit: productState.limit })
    );
  }, [productState.page, productState.limit]);
  return (
    <div style={{ overflow: "hidden" }}>
      <ImportProducts />
      <AddProduct />
      <TableCommon
        title={"Danh sách sản phẩm"}
        data={_.get(productState, "products")}
        loading={_.get(productState, "loading")}
      />
    </div>
  );
};

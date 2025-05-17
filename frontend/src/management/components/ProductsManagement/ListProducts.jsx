import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import ImportProducts from "./AddProduct";
import TableCommon from "../../../common/components/Table";
import { getListProducts } from "../../../redux/actions/product.action";

export const ListProducts = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      getListProducts({ page: productState.page, limit: productState.limit })
    );
  }, [productState.page, productState.limit]);
  return (
    <>
      <ImportProducts />
      <TableCommon
        title={"Danh sách sản phẩm"}
        data={_.get(productState, "products")}
        loading={_.get(productState, "loading")}
      />
    </>
  );
};

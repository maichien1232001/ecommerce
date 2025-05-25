import React, { memo } from "react";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../../redux/actions/product.action";

const { Search } = Input;

const ProductNameFilter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);
  const handleSearch = (value) => {
    const trimmedValue = value?.trim();
    dispatch(updateFilter({ ...filter, name: trimmedValue }));
  };

  return (
    <div>
      <Search
        placeholder="Nhập tên sản phẩm"
        onSearch={handleSearch}
        className="search-product"
        allowClear
      />
    </div>
  );
};

export default memo(ProductNameFilter);

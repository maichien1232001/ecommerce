import React, { memo, useCallback, useState } from "react";
import CommonSelect from "../../../../common/components/Select";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../../redux/actions/product.action";

const FilterByCategory = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const listCategories = useSelector((state) => state.category.category);
  const { filter } = useSelector((state) => state.products);
  return (
    <div>
      <div style={{ marginRight: 8, fontSize: 14 }}>Loại sản phẩm:</div>
      <CommonSelect
        options={listCategories}
        value={selectedCategory}
        onChange={(cat) => {
          setSelectedCategory(cat);
          dispatch(updateFilter({ ...filter, category: cat?._id }));
        }}
        getValue={(item) => item?._id}
        getLabel={(item) => item?.name}
        labelInValue
        placeholder="Chọn loại sản phẩm"
        allowClear
      />
    </div>
  );
};

export default memo(FilterByCategory);

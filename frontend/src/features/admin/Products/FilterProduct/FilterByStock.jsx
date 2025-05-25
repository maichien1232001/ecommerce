import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import CommonSelect from "../../../../common/components/Select";
import { updateFilter } from "../../../../redux/actions/product.action";

const options = [
  { label: "Tất cả", value: "all" },
  { label: "Còn hàng", value: "inStock" },
  { label: "Hết hàng", value: "outOfStock" },
  { label: "Sắp hết", value: "lowStock" },
];

const StockFilter = ({ label = "Tồn kho:", onFilter }) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);
  const [selectedStock, setSelectedStock] = useState(null);

  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ marginRight: 8, fontSize: 14 }}>{label}</label>
      <div>
        <CommonSelect
          defaultValue="all"
          options={options}
          value={selectedStock}
          onChange={(value) => {
            setSelectedStock(value);
            dispatch(updateFilter({ ...filter, inStock: value }));
          }}
          getValue={(item) => item?.value}
          getLabel={(item) => item?.label}
          allowClear={selectedStock !== null}
        />
      </div>
    </div>
  );
};

export default memo(StockFilter);

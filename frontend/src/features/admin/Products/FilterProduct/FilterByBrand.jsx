import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { updateFilter } from "../../../../redux/actions/product.action";
import CommonSelect from "../../../../common/components/Select";

const BrandFilter = () => {
  const dispatch = useDispatch();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const listBrand = useSelector((state) => state.brand.brand);
  const { filter } = useSelector((state) => state.products);
  return (
    <div>
      <div style={{ marginRight: 8, fontSize: 14 }}>Hãng:</div>
      <CommonSelect
        options={listBrand}
        value={selectedBrand}
        onChange={(cat) => {
          setSelectedBrand(cat);
          dispatch(updateFilter({ ...filter, brand: cat?.name.toLowerCase() }));
        }}
        getValue={(item) => item?._id}
        getLabel={(item) => item?.name}
        labelInValue
        placeholder="Chọn hãng"
        allowClear
      />
    </div>
  );
};

export default memo(BrandFilter);

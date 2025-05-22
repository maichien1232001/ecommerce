import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import CommonSelect from "../../../../common/components/Select";
import { updateFilter } from "../../../../redux/actions/product.action";

const options = [
  { label: "Tất cả", value: "all" },
  { label: "Nổi bật", value: true },
  { label: "Không nổi bật", value: false },
];

const FeaturedFilter = ({ label = "Nổi bật:", onFilter }) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);
  const [selectedSFeatured, setSelectedSFeatured] = useState("all");

  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ marginRight: 8, fontSize: 14 }}>{label}</label>

      <div>
        <CommonSelect
          defaultValue="all"
          options={options}
          value={selectedSFeatured}
          onChange={(value) => {
            setSelectedSFeatured(value);
            dispatch(updateFilter({ ...filter, isFeatured: value }));
          }}
          getValue={(item) => item?.value}
          getLabel={(item) => item?.label}
          allowClear={selectedSFeatured !== null}
        />
      </div>
    </div>
  );
};

export default memo(FeaturedFilter);

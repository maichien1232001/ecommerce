import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import CommonSelect from "../../../../common/components/Select";
import { updateFilter } from "../../../../redux/actions/product.action";
import { optionTagsFilter } from "../../../../constants/products";

const TagFilter = ({ label = "Tag:", onFilter }) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);
  const [selectedTag, setSelectedTag] = useState("all");

  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ marginRight: 8, fontSize: 14 }}>{label}</label>

      <div>
        <CommonSelect
          defaultValue=""
          options={optionTagsFilter}
          value={selectedTag}
          onChange={(value) => {
            setSelectedTag(value);
            dispatch(updateFilter({ ...filter, specialTag: value }));
          }}
          getValue={(item) => item?.value}
          getLabel={(item) => item?.label}
          allowClear={selectedTag !== null}
        />
      </div>
    </div>
  );
};

export default memo(TagFilter);

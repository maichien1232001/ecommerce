import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import CommonSelect from "../../../../common/components/Select";
import { updateFilter } from "../../../../redux/actions/product.action";
import { status } from "../../../../common/components/Table/constant";

const StatusFilter = ({ label = "Trạng thái" }) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);
  const [selectedStatus, setSelectedStatus] = useState(null);

  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ marginRight: 8, fontSize: 14 }}>{label}</label>
      <div>
        <CommonSelect
          defaultValue=""
          options={status}
          value={selectedStatus}
          onChange={(value) => {
            setSelectedStatus(value);
            dispatch(updateFilter({ ...filter, status: value }));
          }}
          getValue={(item) => item?.value}
          getLabel={(item) => item?.label}
          allowClear={selectedStatus !== null}
        />
      </div>
    </div>
  );
};

export default memo(StatusFilter);

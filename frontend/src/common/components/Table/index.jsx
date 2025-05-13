import React, { useState } from "react";
import { Table } from "antd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setPagination } from "../../../redux/actions/product.action";
import { columns } from "./constant";

const TableCommon = (props) => {
  const { loading, title, data } = props;
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);
  const [valueCell, setValueCell] = useState();
  if (_.isEmpty(data)) return;
  return (
    <>
      <div>{title}</div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: productState.page,
          pageSize: productState.limit,
          total: _.get(productState, "pagination.totalCount"),
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total) => `Tổng ${total} sản phẩm`,
        }}
        scroll={{ y: 600 }}
        style={{ overflowY: "auto", marginTop: "20px" }}
        onChange={(pagination) => {
          dispatch(
            setPagination({
              page: pagination.current,
              limit: pagination.pageSize,
            })
          );
        }}
      />
    </>
  );
};

export default TableCommon;

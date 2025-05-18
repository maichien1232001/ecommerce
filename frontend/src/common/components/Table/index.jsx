import React, { useState } from "react";
import { Table } from "antd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setPagination } from "../../../redux/actions/product.action";
import { getColumns } from "./constant";

const TableCommon = (props) => {
  const { loading, title, data } = props;
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);
  const [valueCell, setValueCell] = useState();
  const handleActionClick = (key, record) => {
    console.log("Thao tác:", key);
    console.log("Dữ liệu dòng:", record);

    // Ví dụ xử lý:
    if (key === "edit") {
      // mở modal sửa
    } else if (key === "delete") {
      // gọi API xóa
    }
  };
  return (
    <div style={{ overflow: "hidden" }}>
      <div>{title}</div>
      <Table
        rowKey="id"
        columns={getColumns(
          handleActionClick,
          productState.page,
          productState.limit
        )}
        dataSource={data}
        loading={loading}
        pagination={{
          current: productState.page,
          pageSize: productState.limit,
          total: _.get(productState, "pagination.totalCount"),
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50", "100"],
          showTotal: (total) => `Tổng ${total} sản phẩm`,
        }}
        scrollToFirstRowOnChange
        scroll={{
          x: "max-content",
          y: window.innerHeight * 0.6,
        }}
        onChange={(pagination) => {
          dispatch(
            setPagination({
              page: pagination.current,
              limit: pagination.pageSize,
            })
          );
        }}
      />
    </div>
  );
};

export default TableCommon;

import React, { useState } from "react";
import { Table } from "antd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../redux/actions/product.action";
import { getColumns } from "./constant";

const TableCommon = (props) => {
  const { loading, title, data, className, handleActionClick } = props;
  const dispatch = useDispatch();
  const { filter, pagination } = useSelector((state) => state.products);
  return (
    <div className={className}>
      <div style={{ marginBottom: 8 }}>{title}</div>
      <Table
        rowKey="id"
        columns={getColumns(
          handleActionClick,
          _.get(filter, "page"),
          _.get(filter, "limit")
        )}
        dataSource={data}
        loading={loading}
        pagination={{
          current: _.get(filter, "page"),
          pageSize: _.get(filter, "limit"),
          total: _.get(pagination, "totalCount"),
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50", "100"],
          showTotal: (total) => `Tổng ${total} sản phẩm`,
        }}
        scrollToFirstRowOnChange
        scroll={{
          x: "max-content",
          y: window.innerHeight * 0.7,
        }}
        onChange={(pagination) => {
          dispatch(
            updateFilter({
              ...filter,
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

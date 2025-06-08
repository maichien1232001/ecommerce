import React, { useState } from "react";
import { Table } from "antd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../redux/actions/product.action";

const TableCommon = (props) => {
  const { loading, title, data, className, columns, pagination } = props;
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);
  return (
    <div className={className}>
      <div style={{ marginBottom: 8 }}>{title}</div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
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

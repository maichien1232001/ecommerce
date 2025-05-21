import React, { useState } from "react";
import { Table } from "antd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../redux/actions/product.action";
import { getColumns } from "./constant";

const TableCommon = (props) => {
  const { loading, title, data, handleActionClick } = props;
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);
  return (
    <div style={{ overflow: "hidden" }}>
      <div>{title}</div>
      <Table
        rowKey="id"
        columns={getColumns(
          handleActionClick,
          _.get(productState, "filter.page"),
          _.get(productState, "filter.limit")
        )}
        dataSource={data}
        loading={loading}
        pagination={{
          current: _.get(productState, "filter.page"),
          pageSize: _.get(productState, "filter.limit"),
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
            updateFilter({
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

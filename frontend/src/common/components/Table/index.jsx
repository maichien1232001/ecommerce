import React, { memo } from "react";
import { Table } from "antd";

const TableCommon = (props) => {
  const { loading, title, data, className, columns, pagination, onChange } =
    props;
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
        onChange={onChange}
      />
    </div>
  );
};

export default memo(TableCommon);

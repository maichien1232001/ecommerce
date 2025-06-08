import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Tooltip } from "antd";
import dayjs from "dayjs";

export const columnsCategories = (onActionClick) => [
  {
    title: "STT",
    fixed: "left",
    align: "center",
    width: "70px",
    ellipsis: true,

    render: (_, record, index) => index + 1,
  },
  {
    title: "Tên loại",
    fixed: "left",
    align: "center",
    width: "70px",
    ellipsis: true,
    dataIndex: "name",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    ellipsis: true,
    width: "100px",
    render: (value) => (
      <>
        {dayjs(value).format("HH:mm")}
        <br />
        {dayjs(value).format("DD/MM/YYYY")}
      </>
    ),
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    key: "updatedAt",
    align: "center",
    ellipsis: true,
    width: "150px",
    render: (value) => (
      <>
        {dayjs(value).format("HH:mm")}
        <br />
        {dayjs(value).format("DD/MM/YYYY")}
      </>
    ),
  },
  {
    title: "Thao tác",
    key: "action",
    align: "center",
    ellipsis: true,
    fixed: "right",
    width: "120px",
    render: (record) => {
      const menuItems = [
        {
          key: "edit",
          label: "Sửa",
        },
        {
          key: "delete",
          label: "Xóa",
        },
      ];

      return (
        <Dropdown
          menu={{
            items: menuItems,
            onClick: ({ key }) => onActionClick(key, record),
          }}
          trigger={["click"]}
        >
          <Tooltip title="Thao tác">
            <EllipsisOutlined style={{ fontSize: 20, cursor: "pointer" }} />
          </Tooltip>
        </Dropdown>
      );
    },
  },
];

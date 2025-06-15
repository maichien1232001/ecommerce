import { Card } from "antd";
import React, { useEffect, useState } from "react";
import TableCommon from "../../common/components/Table";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { columnsCategories } from "../../constants/category";
import {
  deleteItemCategory,
  getListCategories,
  updateFilterCategory,
} from "../../redux/actions/category.actions";
import AddCategory from "./AddCategory";
import _ from "lodash";
import EditCategory from "./EditCategory";

const Categories = () => {
  const dispatch = useDispatch();
  const { category, loading, filter, pagination } = useSelector(
    (state) => state.category,
    shallowEqual
  );
  const [selectedItem, setSelectedItem] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  console.log("Component render", loading);

  const handleActionClick = (key, record) => {
    if (key === "edit") {
      setSelectedItem(record);
      setIsOpenModal(true);
    }
    if (key === "delete") {
      dispatch(deleteItemCategory(record._id));
    }
  };
  useEffect(() => {
    dispatch(getListCategories(filter));
  }, [dispatch, filter]);

  return (
    <>
      <AddCategory />
      <Card className="card-table-product">
        <TableCommon
          title={"Danh sách sản phẩm"}
          className="table-product"
          data={category}
          loading={loading}
          handleActionClick={handleActionClick}
          columns={columnsCategories(handleActionClick)}
          pagination={{
            current: _.get(filter, "page"),
            pageSize: _.get(filter, "limit"),
            total: _.get(pagination, "totalCount"),
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50", "100"],
            showTotal: (total) => `Tổng ${total} loại sản phẩm`,
          }}
          onChange={(pagination) => {
            dispatch(
              updateFilterCategory({
                ...filter,
                page: pagination.current,
                limit: pagination.pageSize,
              })
            );
          }}
        />
      </Card>
      {isOpenModal && (
        <EditCategory
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          item={selectedItem}
        />
      )}
    </>
  );
};

export default Categories;

import { Card } from "antd";
import React, { useEffect, useState } from "react";
import TableCommon from "../../common/components/Table";
import { useDispatch, useSelector } from "react-redux";
import { columnsCategories } from "../../constants/category";
import {
  deleteItemCategory,
  getListCategories,
} from "../../redux/actions/category.actions";

const Categories = () => {
  const dispatch = useDispatch();
  const { category, loading, filter } = useSelector((state) => state.category);
  const [selectedItem, setSelectedItem] = useState();
  const [isOpenEditItem, setIsOpenEditItem] = useState(false);

  const handleActionClick = (key, record) => {
    if (key === "edit") {
      setSelectedItem(record);
      setIsOpenEditItem(true);
    }
    if (key === "delete") {
      dispatch(deleteItemCategory(record._id));
    }
  };
  useEffect(() => {
    dispatch(getListCategories(filter));
  }, [dispatch, filter]);
  return (
    <Card className="card-table-product">
      <TableCommon
        title={"Danh sách sản phẩm"}
        className="table-product"
        data={category}
        loading={loading}
        handleActionClick={handleActionClick}
        columns={columnsCategories(handleActionClick)}
      />
    </Card>
  );
};

export default Categories;

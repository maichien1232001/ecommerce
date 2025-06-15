import React, { useCallback, useState } from "react";
import { Button, Form } from "antd";
import { useDispatch } from "react-redux";
import {
  createCategory,
  updateItemCategory,
} from "../../redux/actions/category.actions";
import ModalAction from "./ModalAction";

const EditCategory = (props) => {
  const { isOpenModal, setIsOpenModal, item } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleClose = useCallback(() => {
    setIsOpenModal(false);
    form.resetFields();
  }, [form, setIsOpenModal]);

  const handleSubmit = useCallback(
    async (value) => {
      await dispatch(updateItemCategory({ categoryId: item._id, name: value }));
      handleClose();
    },
    [dispatch, item?._id, handleClose]
  );
  return (
    <div className="flex justify-end mt-4 mb-4">
      <Button type="primary" onClick={() => setIsOpenModal(true)}>
        Cập nhật loại sản phẩm
      </Button>
      <ModalAction
        form={form}
        isOpenModal={isOpenModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
        title={"Cập nhật loại sản phẩm"}
        value={item?.name}
      />
    </div>
  );
};

export default EditCategory;

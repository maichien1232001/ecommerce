import React, { useState } from "react";
import { Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/actions/category.actions";
import ModalAction from "./ModalAction";

const AddCategory = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleClose = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    await dispatch(createCategory(values));
    handleClose();
  };

  return (
    <div className="flex justify-end mt-4 mb-4">
      <Button type="primary" onClick={() => setIsOpenModal(true)}>
        Thêm loại sản phẩm
      </Button>
      <ModalAction
        form={form}
        isOpenModal={isOpenModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
        title={"Thêm loại sản phẩm"}
      />
    </div>
  );
};

export default AddCategory;

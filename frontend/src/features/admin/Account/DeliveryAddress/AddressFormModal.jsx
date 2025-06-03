import React from "react";
import { Form, Modal } from "antd";
import FormShippingAddress from "../../../../common/components/Form/FormShippingAddress";

const AddressFormModal = ({
  visible,
  mode,
  onCancel,
  onSubmit,
  hideDefaultCheckbox = false,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    onSubmit(values, mode);
  };

  return (
    <Modal
      title={mode === "add" ? "Thêm địa chỉ giao hàng" : "Chỉnh sửa địa chỉ"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      destroyOnClose
    >
      <FormShippingAddress
        handleSubmit={handleSubmit}
        hideDefaultCheckbox={hideDefaultCheckbox}
        loading={loading}
        mode={mode}
        onCancel={onCancel}
        isModal={true}
        form={form}
      />
    </Modal>
  );
};

export default AddressFormModal;

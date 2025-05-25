import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormProducts from "./FormProducts";
import { find } from "lodash";
import { optionTags, statusOptionsBase } from "../../../constants/products";

const ProductModal = ({
  visible,
  onClose,
  product,
  onSubmit,
  title,
  isEdit,
}) => {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    selectedCategory: null,
    selectedBrand: null,
    selectedStatus: null,
    fileList: [],
    productType: null,
    selectedTag: null,
  });
  const listCategories = useSelector((state) => state.category.category);
  const listbrands = useSelector((state) => state.brand.brand);

  useEffect(() => {
    if (visible) {
      if (product) {
        const currentType = Object.keys(product.specifications || {})[0];

        // Map các trường cần match vào danh sách
        const matchMap = {
          category: [listCategories, product.category],
          brand: [listbrands, product.brand],
          status: [statusOptionsBase, product.status],
          specialTag: [optionTags, product.specialTag],
        };

        const matchedValues = Object.entries(matchMap).reduce(
          (acc, [key, [list, value]]) => {
            acc[key] =
              find(
                list,
                (item) => item._id === value || item.value === value
              ) || null;
            return acc;
          },
          {}
        );

        const newFileList =
          product.images?.map((img, index) => ({
            uid: index.toString(),
            name: `image-${index}`,
            status: "done",
            url: img.url || img,
          })) || [];

        // Cập nhật state
        setState((prev) => ({
          ...prev,
          productType: currentType,
          selectedCategory: matchedValues.category,
          fileList: newFileList,
        }));

        // Cập nhật form
        form.setFieldsValue({
          name: product.name,
          price: product.price,
          description: product.description,
          category: matchedValues.category,
          stock: product.stock,
          productType: currentType,
          brand: matchedValues.brand,
          status: matchedValues.status,
          specialTag: matchedValues.specialTag,
          specifications: {
            [currentType]: product.specifications?.[currentType] || {},
          },
          images: newFileList,
        });
      } else {
        form.resetFields();
        setState({
          ...state,
          selectedCategory: null,
          fileList: [],
          productType: "",
        });
      }
    }
  }, [visible, product, form, listCategories]);

  const handleFinish = (values) => {
    if (onSubmit) onSubmit(values);
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <FormProducts
        form={form}
        handleClose={onClose}
        handleSubmit={handleFinish}
        state={state}
        setState={setState}
        isEdit={isEdit}
      />
    </Modal>
  );
};

export default ProductModal;

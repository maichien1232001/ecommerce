import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormProducts from "./FormProducts";

const ProductModal = ({
  visible,
  onClose,
  product,
  onSubmit,
  title,
  isEdit,
}) => {
  const [form] = Form.useForm();
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedBrand, setSelectedBrand] = useState(null);
  // const [selectedFeatured, setSelectedFeatured] = useState(null);
  // const [selectedStatus, setSelectedStatus] = useState(null);
  // const [fileList, setFileList] = useState([]);
  // const [productType, setProductType] = useState();
  const [state, setState] = useState({
    selectedCategory: null,
    selectedBrand: null,
    selectedFeatured: null,
    selectedStatus: null,
    fileList: [],
    productType: null,
  });
  const listCategories = useSelector((state) => state.category.category);

  useEffect(() => {
    if (visible) {
      if (product) {
        const currentType = Object.keys(product.specifications || {})[0];
        const matchedCategory = listCategories.find(
          (cat) => cat._id === product.category
        );
        const newFileList =
          product.images?.map((img, index) => ({
            uid: index.toString(),
            name: `image-${index}`,
            status: "done",
            url: img.url || img,
          })) || [];

        setState((prev) => ({
          ...prev,
          productType: currentType,
          selectedCategory: matchedCategory || null,
          fileList: newFileList,
        }));

        form.setFieldsValue({
          name: product.name,
          price: product.price,
          description: product.description,
          category: matchedCategory,
          stock: product.stock,
          productType: currentType,
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
        // setSelectedCategory(null);
        // setFileList([]);
        // setProductType("");
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
        // selectedCategory={selectedCategory}
        // setSelectedCategory={setSelectedCategory}
        // fileList={fileList}
        // setFileList={setFileList}
        // productType={productType}
        // setProductType={setProductType}
        // selectedBrand={selectedBrand}
        // setSelectedBrand={setSelectedBrand}
        // selectedFeatured={selectedFeatured}
        // setSelectedFeatured={setSelectedFeatured}
        // selectedStatus={selectedStatus}
        // setSelectedStatus={setSelectedStatus}
      />
    </Modal>
  );
};

export default ProductModal;

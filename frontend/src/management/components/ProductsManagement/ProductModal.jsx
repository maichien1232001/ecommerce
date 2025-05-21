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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [productType, setProductType] = useState();
  const listCategories = useSelector((state) => state.category.category);

  useEffect(() => {
    if (visible) {
      if (product) {
        const currentType = Object.keys(product.specifications || {})[0];
        setProductType(currentType);

        const matchedCategory = listCategories.find(
          (cat) => cat._id === product.category
        );
        setSelectedCategory(matchedCategory || null);

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
        });

        if (product.images && product.images.length) {
          const newFileList = product.images.map((img, index) => ({
            uid: index.toString(),
            name: `image-${index}`,
            status: "done",
            url: img.url || img,
          }));

          setFileList(newFileList);

          // Thêm dòng này để đồng bộ với Ant Design Form
          form.setFieldsValue({ images: newFileList });
        }
      } else {
        form.resetFields();
        setSelectedCategory(null);
        setFileList([]);
        setProductType("");
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
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        fileList={fileList}
        setFileList={setFileList}
        isEdit={isEdit}
        productType={productType}
        setProductType={setProductType}
      />
    </Modal>
  );
};

export default ProductModal;

import { useEffect, useState } from "react";
import FormProducts from "./FormProducts";
import { Form, Modal } from "antd";
import { useSelector } from "react-redux";

const ViewProduct = (props) => {
  const { visible, onClose, product } = props;
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [productType, setProductType] = useState(); // <-- thêm state này
  const listCategories = useSelector((state) => state.category.category);
  useEffect(() => {
    if (visible && product) {
      const currentType = Object.keys(product.specifications || {})[0];
      setProductType(currentType);

      const matchedCategory = listCategories.find(
        (cat) => cat._id === product.category
      );

      setSelectedCategory(matchedCategory || null);

      if (product && product.name) {
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
      }

      if (product.images && product.images.length) {
        setFileList(
          product.images.map((img, index) => ({
            uid: index,
            name: `image-${index}`,
            status: "done",
            url: img.url || img,
          }))
        );
      } else {
        setFileList([]);
      }
    } else {
      form.resetFields();
      setSelectedCategory(null);
      setFileList([]);
      setProductType("");
    }
  }, [visible, product, form, listCategories]);

  return (
    <Modal
      title={"Chi tiết sản phẩm"}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <FormProducts
        form={form}
        isEdit={false}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        fileList={fileList}
        setFileList={setFileList}
        productType={productType} // truyền vào để dùng trong form
        setProductType={setProductType}
      />
    </Modal>
  );
};

export default ViewProduct;

import { Form, Select } from "antd";

const { Item } = Form;

const productTypes = [
  { value: "laptop", label: "Laptop" },
  { value: "smartphone", label: "Smartphone" },
  { value: "tablet", label: "Tablet" },
  { value: "desktop", label: "Desktop" },
];

const ProductTypeSelect = ({ productType, setProductType }) => (
  <Item
    label="Loại thông số kỹ thuật"
    name="productType"
    rules={[{ required: true, message: "Chọn loại sản phẩm kỹ thuật" }]}
  >
    <Select value={productType} onChange={setProductType}>
      {productTypes.map(({ value, label }) => (
        <Select.Option key={value} value={value}>
          {label}
        </Select.Option>
      ))}
    </Select>
  </Item>
);

export default ProductTypeSelect;

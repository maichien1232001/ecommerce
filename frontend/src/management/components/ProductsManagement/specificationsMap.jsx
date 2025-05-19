import { Form, Input } from "antd";
const { Item } = Form;
const { TextArea } = Input;

const specificationsMap = {
  laptop: [
    { label: "CPU", name: "cpu" },
    { label: "RAM", name: "ram" },
    { label: "Storage", name: "storage" },
    { label: "Màn hình", name: "screen" },
    { label: "Pin", name: "battery" },
    { label: "Camera", name: "camera" },
    { label: "Hệ điều hành", name: "operatingSystem" },
    { label: "Màu sắc", name: "color" },
    { label: "Trọng lượng", name: "weight" },
    { label: "Kết nối", name: "connectivity" },
    { label: "Khác", name: "others" },
  ],
  smartphone: [
    { label: "CPU", name: "cpu" },
    { label: "RAM", name: "ram" },
    { label: "Storage", name: "storage" },
    { label: "Màn hình", name: "screen" },
    { label: "Pin", name: "battery" },
    { label: "Camera", name: "camera" },
    { label: "Hệ điều hành", name: "operatingSystem" },
    { label: "Màu sắc", name: "color" },
    { label: "Kết nối", name: "connectivity" },
    { label: "Khác", name: "others" },
  ],
  tablet: [
    // Có thể thêm hoặc bớt trường cho tablet
    { label: "CPU", name: "cpu" },
    { label: "RAM", name: "ram" },
    { label: "Storage", name: "storage" },
    { label: "Màn hình", name: "screen" },
    { label: "Pin", name: "battery" },
    { label: "Hệ điều hành", name: "operatingSystem" },
    { label: "Màu sắc", name: "color" },
    { label: "Khác", name: "others" },
  ],
  desktop: [
    // Thông số cho desktop có thể khác
    { label: "CPU", name: "cpu" },
    { label: "RAM", name: "ram" },
    { label: "Storage", name: "storage" },
    { label: "Màn hình", name: "screen" },
    { label: "Hệ điều hành", name: "operatingSystem" },
    { label: "Màu sắc", name: "color" },
    { label: "Kết nối", name: "connectivity" },
    { label: "Khác", name: "others" },
  ],
};

const SpecificationsFields = ({ productType }) => {
  if (!productType) return null;

  const prefix = ["specifications", productType];
  const fields = specificationsMap[productType] || [];

  return (
    <>
      {fields.map(({ label, name }) => (
        <Item key={name} label={label} name={[...prefix, name]}>
          <TextArea
            className="input-form input-form-textarea"
            rows={2}
            maxLength={200}
            allowClear
          />
        </Item>
      ))}
    </>
  );
};

export default SpecificationsFields;

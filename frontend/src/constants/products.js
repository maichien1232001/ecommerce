export const statusOptionsBase = [
  { label: "Đang bán", value: "active" },
  { label: "Ngừng bán", value: "inactive" },
  { label: "Ngừng kinh doanh", value: "discontinued" },
];

export const statusFilterOptions = [
  { label: "Tất cả", value: "" },
  ...statusOptionsBase,
];

export const optionTags = [
  { label: "Khuyến mãi", value: "sale" },
  { label: "Nổi bật", value: "featured" },
  { label: "Sản phẩm mới", value: "new" },
  { label: "Bán chạy nhất", value: "bestseller" },
  { label: "Đánh giá cao nhất", value: "topRated" },
];

export const optionTagsFilter = [{ label: "Tất cả", value: "" }, ...optionTags];

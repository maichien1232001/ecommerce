import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Avatar,
  Modal,
  message,
  DatePicker,
} from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { getColor, getFirstCharacter } from "../../../constants/avatar";
import { uploadImagesApi } from "../../../apis/uploadImg.api";
import { useDispatch } from "react-redux";
import { updateProfileAccount } from "../../../redux/actions/user.actions";
import dayjs from "dayjs";
import _ from "lodash";
import { notifyError, notifySuccess } from "../../../common/components/Tostify";

const { Option } = Select;

const Info = ({ user }) => {
  const dispatch = useDispatch();
  const dateFormat = "DD/MM/YYYY";
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      let dateOfBirth = null;
      if (user.dateOfBirth) {
        const parsedDate = dayjs(user.dateOfBirth);
        if (parsedDate.isValid()) {
          dateOfBirth = parsedDate;
        }
      }

      form.setFieldsValue({
        ...user,
        dateOfBirth,
      });
      setAvatarUrl(user.avatar || "");
    }
  }, [user, form]);

  const handlePreview = () => {
    setPreviewImage(avatarUrl || user?.avatar || "");
    setPreviewVisible(true);
  };

  const handleEdit = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJpgOrPng) {
      Modal.error({
        title: "Lỗi định dạng file",
        content: "Chỉ hỗ trợ file JPG/PNG!",
      });
      return;
    }

    if (!isLt2M) {
      Modal.error({
        title: "Lỗi kích thước file",
        content: "Kích thước ảnh phải nhỏ hơn 2MB!",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(reader.result);
    reader.readAsDataURL(file);
    form.setFieldsValue({ avatarFile: file });

    e.target.value = "";
  };

  const handleSubmit = async (values) => {
    const file = values.avatarFile;
    try {
      let uploadedUrl = null;
      if (file) {
        const formData = new FormData();
        formData.append("images", file);
        setUploading(true);
        const res = await uploadImagesApi(formData);
        uploadedUrl = res?.images?.[0]?.url;

        if (!uploadedUrl) {
          throw new Error("Không nhận được URL ảnh từ server.");
        }
      }

      let dateOfBirth = null;
      if (values.dateOfBirth) {
        if (dayjs.isDayjs(values.dateOfBirth)) {
          dateOfBirth = values.dateOfBirth.toISOString();
        } else {
          const parsedDate = dayjs(values.dateOfBirth);
          if (parsedDate.isValid()) {
            dateOfBirth = parsedDate.toISOString();
          }
        }
      }

      const payload = {
        ...values,
        dateOfBirth,
        avatar: uploadedUrl || values.avatar,
      };

      delete payload.avatarFile;

      await dispatch(updateProfileAccount(payload));
      notifySuccess("Cập nhật thông tin thành công!");
    } catch (err) {
      console.error("Lỗi upload ảnh:", err);
      notifyError("Tải ảnh lên thất bại");
      return;
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="tab-content">
      <Card title="Thông tin cá nhân" className="info-card">
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-container">
            <Avatar
              size={120}
              src={avatarUrl}
              className="user-avatar"
              style={{
                backgroundColor: getColor(user?.name || "User"),
                verticalAlign: "middle",
              }}
            >
              {getFirstCharacter(user?.name)}
            </Avatar>
            <div className="avatar-overlay">
              <div className="avatar-actions">
                <Button
                  type="text"
                  icon={<EyeOutlined />}
                  className="avatar-action-btn view-btn"
                  onClick={handlePreview}
                  title="Xem ảnh"
                />
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  className="avatar-action-btn edit-btn"
                  onClick={handleEdit}
                  title="Thay đổi ảnh"
                  loading={uploading}
                />
              </div>
            </div>
          </div>
          <div className="avatar-info">
            <h3>{user?.name || "Người dùng"}</h3>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/jpeg,image/png"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />

        {/* Form Section */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="user-form"
        >
          <Form.Item name="avatar" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="avatarFile" hidden>
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giới tính" name="gender">
                <Select placeholder="Chọn giới tính">
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Ngày sinh" name="dateOfBirth">
                <DatePicker format={dateFormat} placeholder="Chọn ngày sinh" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="submit-btn"
              loading={uploading}
            >
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>

        {/* Preview Modal */}
        <Modal
          open={previewVisible}
          title="Xem ảnh đại diện"
          footer={null}
          onCancel={() => setPreviewVisible(false)}
          centered
          className="avatar-preview-modal"
        >
          <img
            alt="Avatar preview"
            style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }}
            src={previewImage}
          />
        </Modal>
      </Card>
    </div>
  );
};

export default Info;

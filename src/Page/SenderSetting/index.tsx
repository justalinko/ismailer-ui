import { FormOutlined, IdcardOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification, PageHeader } from "antd";
import React from "react";
import { SenderSettingDto } from "../../Dto/SenderSettingDto";
import { SenderRepository } from "../../Repository/SenderRepository";
export interface SenderSettingPageProps {}

export function SenderSettingPage() {
  const [form] = Form.useForm<SenderSettingDto>();

  const setting = SenderRepository.loadSavedSetting();

  function onSave(setting: SenderSettingDto) {
    SenderRepository.saveSetting(setting);
    openNotificationWithIcon();
  }

  const openNotificationWithIcon = () => {
    notification.success({
      message: "Data Saved Successfully",
    });
  };

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <PageHeader className="site-page-header" title="Sender Setting Page" />
      <Form layout="vertical" form={form} onFinish={onSave} size="large" initialValues={setting}>
        <Form.Item
          name="fromEmail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input sender E-mail",
            },
          ]}
          label="Sender Email"
          labelCol={{}}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Sender Email" />
        </Form.Item>
        <Form.Item
          name="fromName"
          label="Sender Name"
          rules={[
            {
              required: true,
              message: "Please input sender name",
            },
          ]}
        >
          <Input prefix={<IdcardOutlined className="site-form-item-icon" />} placeholder="Sender Name" />
        </Form.Item>
        <Form.Item
          label="Subject"
          name="subject"
          rules={[
            {
              required: true,
              message: "Please input email subject",
            },
          ]}
        >
          <Input prefix={<FormOutlined className="site-form-item-icon" />} placeholder="Subject" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

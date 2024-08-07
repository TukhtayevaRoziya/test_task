import React from "react";
import { Breadcrumb, Form, Input } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";

export const BreadcrumbHelpers = ({ to, from }) => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <BreadcrumbItem>{to}</BreadcrumbItem>
      <BreadcrumbItem>{from}</BreadcrumbItem>
    </Breadcrumb>
  );
};

export const FieldHelpers = ({
  label,
  name,
  required = true,
  message,
  inp = true,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: message,
        },
      ]}
    >
      {inp ? <Input /> : <Input.Password />}
    </Form.Item>
  );
};

import { Checkbox, Form, Input, InputNumber } from "antd";
import * as yup from "yup";
import React from "react";
import { Rule } from "antd/lib/form";
import Text from "antd/lib/typography/Text";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  placeholder?: string;
  dataIndex: string;
  title: any;
  inputType: EditableCellType;
  record: any;
  index: number;
  validation: yup.AnySchema;
  children: React.ReactNode;
}

export type EditableCellType = "number" | "text" | "checkbox";

const EditableCell: React.FC<EditableCellProps> = ({ editing, dataIndex, title, inputType, record, index, children, validation, placeholder, ...restProps }) => {
  let inputNode: JSX.Element;
  switch (inputType) {
    case "checkbox":
      inputNode = <Checkbox />;
      break;
    case "number":
      inputNode = <InputNumber placeholder={placeholder} />;
      break;

    default:
      inputNode = <Input placeholder={placeholder} />;
      break;
  }

  const rules: Rule[] | undefined = validation
    ? [
        {
          validator: async (_, value) => {
            try {
              await validation.validate(value);
              return Promise.resolve();
            } catch (error) {
              return Promise.reject(error.message);
            }
          },
        },
      ]
    : undefined;

  const checkboxValueChecked = children?.toString().split(",")[1] === "true";

  const childrenNode = inputType === "checkbox" ? <Checkbox checked={checkboxValueChecked} disabled /> : children;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} valuePropName={inputType === "checkbox" ? "checked" : undefined} style={{ margin: 0 }} rules={rules}>
          {inputNode}
        </Form.Item>
      ) : (
        <>
          {childrenNode}
          {children?.toString() === "," && <Text disabled>{placeholder}</Text>}
        </>
      )}
    </td>
  );
};

export default EditableCell;

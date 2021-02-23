/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Table, Popconfirm, Form, Typography } from "antd";
import EditableCell, { EditableCellType } from "../../Atom/EditableCell";
import "./style.css";
import * as yup from "yup";
import { ColumnsType, ColumnType } from "antd/lib/table";

export interface EditableColumn<T> extends ColumnType<T> {
  editable?: boolean;
  validation?: yup.AnySchema;
  placeholder?: string;
  type?: EditableCellType;
}

export interface EditableTableProps<T> {
  columns: EditableColumn<T>[];
  datasource: T[];
  onRowChanged?: (row: T, key: React.Key) => void;
  onRowDeleted?: (row: T, key: React.Key) => void;
}

export interface EditableRecord {
  key: React.Key;
}

function EditableTable<T extends EditableRecord>({ columns, datasource, onRowChanged, onRowDeleted }: EditableTableProps<T>) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: T) => record.key === editingKey;

  console.log("datasource is", datasource);

  const edit = (record: Partial<T>) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key as string);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as T;
      if (onRowChanged) onRowChanged(row, key);

      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const mergedColumns = [
    ...columns,
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_: any, record: T) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            {" | "}
            {datasource.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => onRowDeleted && onRowDeleted(record, record.key)}>
                <Typography.Link disabled={editingKey !== ""}>Delete</Typography.Link>
              </Popconfirm>
            ) : null}
          </span>
        );
      },
    },
  ].map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: T) => ({
        record,
        inputType: col.type || "text",
        dataIndex: col.dataIndex,
        title: col.title,
        validation: col.validation,
        placeholder: col.placeholder,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={datasource}
        columns={mergedColumns as ColumnsType<T>}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
}

export default EditableTable;

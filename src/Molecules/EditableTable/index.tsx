/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Table, Popconfirm, Form, Typography } from "antd";
import EditableCell, { EditableCellType } from "../../Atom/EditableCell";
import "./style.css";
import * as yup from "yup";
import { ColumnsType, ColumnType, TableProps } from "antd/lib/table";

export interface EditableColumn<T> extends ColumnType<T> {
  editable?: boolean;
  validation?: yup.AnySchema;
  placeholder?: string;
  type?: EditableCellType;
}

export interface EditableTableProps<T> extends TableProps<T> {
  columns: EditableColumn<T>[];
  datasource: T[];
  includeDeleteOperation?: boolean;
  onRowChanged?: (row: T, index: number) => void;
  onRowDeleted?: (row: T, index: number) => void;
}

type EditableRecord<T> = { key: React.Key } & T;

function EditableTable<T extends object>({ columns, onRowChanged, onRowDeleted, includeDeleteOperation, ...props }: EditableTableProps<T>) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const datasource = props.datasource.map<EditableRecord<T>>((record, index) => ({
    ...record,
    key: index,
  }));

  const isEditing = (record: EditableRecord<T>) => record.key === editingKey;

  console.log("datasource is", datasource);

  const edit = (record: Partial<EditableRecord<T>>) => {
    form.setFieldsValue({ ...record });
    // TODO: add more proper way to delete/update the record
    setEditingKey(record.key as string);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as T;
      if (onRowChanged) onRowChanged(row, key as number);

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
      render: (_: any, record: EditableRecord<T>) => {
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

            {includeDeleteOperation && " | "}
            {datasource.length >= 1 && includeDeleteOperation ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => onRowDeleted && onRowDeleted(record, record.key as number)}>
                <Typography.Link disabled={editingKey !== ""}>Delete</Typography.Link>
              </Popconfirm>
            ) : null}
          </span>
        );
      },
    },
    //@ts-ignore
  ].map((col: EditableColumn<EditableRecord<T>>) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: EditableRecord<T>) => ({
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
        {...props}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={datasource}
        columns={mergedColumns as ColumnsType<any>}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
}

export default EditableTable;

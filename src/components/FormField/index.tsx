import React from 'react';
import {
  ProFormText,
  ProFormTextArea,
  ProFormCascader,
  ProFormSelect,
  ProFormRadio,
  ProFormDigit,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import type { FormItemType } from '../typings';

const components = {
  text: ProFormText,
  password: ProFormText.Password,
  textarea: ProFormTextArea,
  cascader: ProFormCascader,
  select: ProFormSelect,
  radio: ProFormRadio.Group,
  digit: ProFormDigit,
  uploadButton: ProFormUploadButton,
};
const Field: React.FC<{ item: FormItemType }> = ({
  item: { type = 'text', required = false, width = 'lg', ...props },
}) => {
  const Component = components[type];
  return <Component {...props} required={required} width={width} />;
};

const FormField: React.FC<{ items: FormItemType[] }> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <Field key={item.name} item={item} />
      ))}
    </>
  );
};

export type FieldType = keyof typeof components;
export default FormField;

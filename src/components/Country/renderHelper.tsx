import type { FormInstance } from 'antd';
import Country from '.';

export const renderAreaFormItem = (
  _: any,
  { type, defaultRender, ...rest }: any,
  form: FormInstance,
) => {
  if (type === 'form') {
    return null;
  }
  const status = form.getFieldValue('state');
  if (status !== 'open') {
    return <Country {...rest} />;
  }
  return defaultRender(_);
};

export const renderAreaFormatName = (info: any, data: any) => {
  const { countryName = '', provinceName = '', cityName = '', areaName = '' } = info || data || {};
  return `${countryName}${provinceName}${cityName}${areaName}`;
};

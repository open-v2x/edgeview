import React from 'react';
import ProCard from '@ant-design/pro-card';
import { Col, Row } from 'antd';
import { SampleModeOptions } from '@/utils/constants';

type ParameterType = {
  key: string;
  label: string;
  span: number;
  render?: (data: string) => string;
  unit?: string;
};

const ParameterInfo: React.FC<{ parameterInfo: Config.ParameterInfo | undefined }> = ({
  parameterInfo = {},
}) => {
  const upsideCap: ParameterType[] = [
    {
      key: 'upLimit',
      label: t('Forwarding Limit'),
      span: 24,
    },
  ];
  const rsi: ParameterType[] = [
    {
      key: 'upFilters',
      label: t('Filter Rules'),
      span: 24,
      render: (upFilters: string) => upFilters && JSON.stringify(upFilters),
      unit: '',
    },
  ];
  const spat: ParameterType[] = [...upsideCap, ...rsi];
  const bsm: ParameterType[] = [
    {
      key: 'sampleMode',
      label: t('Sampling Method'),
      span: 12,
      render: (sampleMode: string) => SampleModeOptions[sampleMode],
      unit: '',
    },
    {
      key: 'sampleRate',
      label: t('Sampling Rate'),
      span: 12,
    },
    ...upsideCap,
    ...rsi,
  ];

  const infoMap = [
    {
      title: t('BSM_CONFIG_DETAILS'),
      groupKey: 'bsmConfig',
      children: bsm,
    },
    {
      title: t('RSI_CONFIG_DETAILS'),
      groupKey: 'rsiConfig',
      children: rsi,
    },
    {
      title: t('RSM_CONFIG_DETAILS'),
      groupKey: 'rsmConfig',
      children: spat,
    },
    {
      title: t('MAP_CONFIG_DETAILS'),
      groupKey: 'mapConfig',
      children: spat,
    },
    {
      title: t('SPAT_CONFIG_DETAILS'),
      groupKey: 'spatConfig',
      children: spat,
    },
  ];
  return (
    <ProCard title={t('Configuration Parameters')} className="parameter-info" gutter={[20, 20]}>
      {infoMap.map(({ title, groupKey, children }) => (
        <ProCard key={title} colSpan={12} bordered>
          <div className="parameter-title t-center">{title}</div>
          <Row gutter={[16, 14]}>
            {children.map(({ key, span, label, render, unit }) => (
              <Col key={key} span={span}>
                <span>{label}：</span>
                {render?.(parameterInfo[groupKey]?.[key]) || parameterInfo[groupKey]?.[key]}
                {unit ?? ` ${t('bars/s')}`}
              </Col>
            ))}
          </Row>
        </ProCard>
      ))}
    </ProCard>
  );
};

export default ParameterInfo;

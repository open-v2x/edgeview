import React from 'react';
import { history, useRequest } from 'umi';
import ProCard from '@ant-design/pro-card';
import BaseContainer from '@/components/BaseContainer';
import CardList from '@/components/CardList';
import ParameterInfo from '@/components/ParameterInfo';
import { deviceInfo } from '@/services/device/device';
import { DeviceOnlineStatusOptions, DeviceStatusOptions } from '@/utils/constants';
import { Col, Row } from 'antd';

// 基本信息
const BasicInfo: React.FC<{ basicInfo: Device.DeviceListItem | undefined }> = ({
  basicInfo = {},
}) => {
  const infoMap = [
    {
      key: 'rsuId',
      label: t('RSU ID'),
    },
    {
      key: 'rsuName',
      label: t('RSU Name'),
    },
    {
      key: 'rsuEsn',
      label: t('Serial Number'),
    },
    {
      key: 'rsuIP',
      label: t('RSU IP'),
    },
    {
      key: 'provinceName',
      label: t('Installation Area'),
      render: ({
        countryName = '',
        provinceName = '',
        cityName = '',
        areaName = '',
      }: Device.DeviceListItem) => `${countryName}${provinceName}${cityName}${areaName}`,
    },
    {
      key: 'address',
      label: t('Specific Location'),
    },
    {
      key: 'rsuModelName',
      label: t('RSU Model'),
    },
    {
      key: 'createTime',
      label: t('Creation Time'),
    },
    {
      key: 'imei',
      label: t('IMEI'),
    },
    {
      key: 'iccID',
      label: t('Identification Code'),
    },
    {
      key: 'communicationType',
      label: t('Supported Communication Methods'),
    },
    {
      key: 'runningCommunicationType',
      label: t('Current Communication Method'),
    },
    {
      key: 'onlineStatus',
      label: t('Online Status'),
      render: ({ onlineStatus }: Device.DeviceListItem) =>
        DeviceOnlineStatusOptions[`${onlineStatus}`],
    },
    {
      key: 'enabled',
      label: t('Device Status'),
      render: ({ enabled }: Device.DeviceListItem) => DeviceStatusOptions[`${enabled}`],
    },
    {
      key: 'transprotocal',
      label: t('Server Type'),
    },
    {
      key: 'softwareVersion',
      label: t('Version'),
    },
    {
      key: 'hardwareVersion',
      label: t('Hardware Version'),
    },
    {
      key: 'depart',
      label: t('Organization'),
    },
    {
      key: 'desc',
      label: t('Describe'),
      block: true,
    },
  ];
  return (
    <ProCard title={t('Basic information')}>
      <CardList infoMap={infoMap} info={basicInfo} xl={12} />
    </ProCard>
  );
};

// 运行信息
const RunningInfo: React.FC<{ runningInfo: Config.QueryStatusDetails | undefined }> = ({
  runningInfo = {},
}) => {
  const infoMap = [
    {
      title: t('CPU Running Information'),
      groupKey: 'cpu',
      colSpan: { sm: 24, xl: 12 },
      children: [
        { key: 'load', span: 24, label: t('CPU Load') },
        { key: 'uti', span: 24, label: t('CPU Utilization') },
      ],
    },
    {
      title: t('Memory Operation Information'),
      groupKey: 'mem',
      colSpan: { sm: 24, xl: 12 },
      children: [
        { key: 'total', span: 24, label: t('Total Memory (M)') },
        { key: 'used', span: 12, label: t('Stored Memory (M)') },
        { key: 'free', span: 12, label: t('Available Memory (M)') },
      ],
    },
    {
      title: t('Disk Operation Information'),
      groupKey: 'disk',
      colSpan: { sm: 24, xxl: 12 },
      children: [
        { key: 'total', span: 12, label: t('Total Disk (M)') },
        { key: 'used', span: 12, label: t('Used Disk (M)') },
        { key: 'free', span: 12, label: t('Free Disk (M)') },
        { key: 'tps', span: 12, label: t('IO Requests Per Second') },
        { key: 'write', span: 12, label: t('Disk Data Written Per Second (K)') },
        { key: 'read', span: 12, label: t('Disk Data Read Per Second (K)') },
      ],
    },
    {
      title: t('Network Operation Information'),
      groupKey: 'net',
      colSpan: { sm: 24, xxl: 12 },
      children: [
        { key: 'rx', span: 12, label: t('Received Packets Per Second') },
        { key: 'tx', span: 12, label: t('Send Packets Per Second') },
        { key: 'rxByte', span: 12, label: t('Bytes Received Per Second') },
        { key: 'txByte', span: 12, label: t('Bytes Sent Per Second') },
      ],
    },
  ];
  return (
    <ProCard title={t('Running information')} className="parameter-info" gutter={[20, 20]}>
      {infoMap.map(({ title, groupKey, colSpan, children }) => (
        <ProCard key={title} colSpan={colSpan} bordered>
          <div className="parameter-title t-center">{title}</div>
          <Row gutter={[16, 14]}>
            {children.map(({ key, span, label }) => (
              <Col key={key} span={span}>
                <span>{label}：</span>
                {runningInfo[groupKey]?.[key]}
              </Col>
            ))}
          </Row>
        </ProCard>
      ))}
    </ProCard>
  );
};

const DeviceDetails: React.FC<RouterMatchTypes> = ({ match: { params } }) => {
  if (!params.id) {
    history.goBack();
  }

  const { data } = useRequest(
    () => {
      return deviceInfo(+params.id);
    },
    { formatResult: (res) => res },
  );

  return (
    <BaseContainer back>
      <BasicInfo basicInfo={data} />
      <RunningInfo runningInfo={data?.runningInfo} />
      <ParameterInfo parameterInfo={data?.config?.[0]} />
    </BaseContainer>
  );
};

export default DeviceDetails;

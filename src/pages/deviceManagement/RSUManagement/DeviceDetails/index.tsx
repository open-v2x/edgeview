import React from 'react';
import { history, useRequest } from 'umi';
import ProCard from '@ant-design/pro-card';
import BaseContainer from 'edge-src/components/BaseContainer';
import CardList from 'edge-src/components/CardList';
import ParameterInfo from 'edge-src/components/ParameterInfo';
import { deviceInfo, runningInfo } from 'edge-src/services/device/device';
import { DeviceOnlineStatusOptions, DeviceStatusOptions } from 'edge-src/utils/constants';
import CPULineChart from './components/CPULineChart';
import MemoryLineChart from './components/MemoryLineChart';
import DiskLineChart from './components/DiskLineChart';
import NetworkLineChart from './components/NetworkLineChart';
import { renderAreaFormatName } from 'edge-src/components/Country/renderHelper';

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
      render: renderAreaFormatName,
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
      label: t('Device Enabled'),
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
    <ProCard title={t('Basic Information')}>
      <CardList infoMap={infoMap} info={basicInfo} xl={12} />
    </ProCard>
  );
};

// 运行信息
const RunningInfo: React.FC<{ runningData: Device.DeviceRunningInfo | undefined }> = ({
  runningData = {},
}) => {
  const infoMap = [
    {
      title: t('CPU Running Information'),
      children: <CPULineChart list={runningData.cpu || []} />,
    },
    {
      title: t('Memory Operation Information'),
      children: <MemoryLineChart list={runningData.mem || []} />,
    },
    {
      title: t('Disk Operation Information'),
      children: <DiskLineChart list={runningData.disk || []} />,
    },
    {
      title: t('Network Operation Information'),
      children: <NetworkLineChart list={runningData.net || []} />,
    },
  ];
  return (
    <ProCard title={t('Running Information')} className="parameter-info" gutter={[20, 20]}>
      {infoMap.map(({ title, children }) => (
        <ProCard key={title} colSpan={12} bordered>
          <div className="parameter-title t-center">{title}</div>
          <div className="parameter-chart">{children}</div>
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

  const { data: runningData } = useRequest(
    () => {
      return runningInfo(+params.id);
    },
    { formatResult: (res) => res },
  );

  return (
    <BaseContainer back>
      <BasicInfo basicInfo={data} />
      <RunningInfo runningData={runningData} />
      <ParameterInfo parameterInfo={data?.config?.[0]} />
    </BaseContainer>
  );
};

export default DeviceDetails;

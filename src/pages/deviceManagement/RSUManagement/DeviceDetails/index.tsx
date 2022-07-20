import React from 'react';
import { history, useRequest } from 'umi';
import ProCard from '@ant-design/pro-card';
import BaseContainer from '@/components/BaseContainer';
import CardList from '@/components/CardList';
// import ParameterInfo from '@/components/ParameterInfo';
import { deviceInfo } from '@/services/device/device';
import { DeviceOnlineStatusOptions, DeviceStatusOptions } from '@/utils/constants';

// type RunningInfoType = {
//   load: string;
//   utilization: string;
//   totalMemory: number;
//   SavedMemory: number;
//   availableMemory: number;
//   totalDisk: number;
//   usedDisk: number;
//   freeDisk: number;
// };

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
      key: 'desc',
      label: t('Describe'),
      block: true,
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
  ];
  return (
    <ProCard title={t('Basic information')}>
      <CardList infoMap={infoMap} info={basicInfo} xl={12} />
    </ProCard>
  );
};

// 运行信息
// const RunningInfo: React.FC<{ runningInfo: RunningInfoType | undefined }> = ({
//   runningInfo = {},
// }) => {
//   const infoMap = [
//     {
//       title: t('CPU Running Information'),
//       children: [
//         { key: 'load', span: 24, label: t('CPU Load') },
//         { key: 'utilization', span: 24, label: t('CPU Utilization') },
//       ],
//     },
//     {
//       title: t('Memory Operation Information'),
//       children: [
//         { key: 'totalMemory', span: 24, label: t('Total Memory (M)') },
//         { key: 'SavedMemory', span: 12, label: t('Stored Memory (M)') },
//         { key: 'availableMemory', span: 12, label: t('Available Memory (M)') },
//       ],
//     },
//     {
//       title: t('Disk Operation Information'),
//       children: [
//         { key: 'totalDisk', span: 24, label: t('Total Disk (M)') },
//         { key: 'usedDisk', span: 12, label: t('Used Disk (M)') },
//         { key: 'freeDisk', span: 12, label: t('Free Disk (M)') },
//       ],
//     },
//   ];
//   return (
//     <ProCard title={t('Running information')} className="parameter-info" gutter={[20, 20]}>
//       {infoMap.map(({ title, children }) => (
//         <ProCard key={title} colSpan={12} bordered>
//           <div className="parameter-title t-center">{title}</div>
//           <Row gutter={[16, 14]}>
//             {children.map(({ key, span, label }) => (
//               <Col key={key} span={span}>
//                 <span>{label}：</span>
//                 {runningInfo[key]}
//               </Col>
//             ))}
//           </Row>
//         </ProCard>
//       ))}
//     </ProCard>
//   );
// };

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
      {/* <RunningInfo runningInfo={data} />
      <ParameterInfo parameterInfo={data} /> */}
    </BaseContainer>
  );
};

export default DeviceDetails;

import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import { DSDEquipmentTypeOptions } from '@/utils/constants';
import { statusOptionFormat } from '@/utils';
import { sensorDataSharingList } from '@/services/event/sds';
import LonLatUnit from '@/components/LonLatUnit';

const SensorDataSharing: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Event.SDSListItem>[] = [
    { title: t('ID'), dataIndex: 'id', search: false },
    { title: t('Message Number'), dataIndex: 'msgID', search: false },
    {
      title: t('Equipment Type'),
      dataIndex: 'equipmentType',
      valueType: 'select',
      valueEnum: statusOptionFormat(DSDEquipmentTypeOptions),
    },
    {
      title: t('Sensor Longitude'),
      dataIndex: ['sensorPos', 'lon'],
      search: false,
      render: (_, { sensorPos: { lon } }) => <LonLatUnit data={lon} />,
    },
    {
      title: t('Sensor Latitude'),
      dataIndex: ['sensorPos', 'lat'],
      search: false,
      render: (_, { sensorPos: { lat } }) => <LonLatUnit data={lat} />,
    },
    { title: t('Millisecond Time'), dataIndex: 'secMark', search: false },
    { title: t('Vehicle ID'), dataIndex: 'egoID', search: false },
    {
      title: t('Vehicle Longitude'),
      dataIndex: ['egoPos', 'lon'],
      search: false,
      render: (_, { egoPos: { lon } }) => <LonLatUnit data={lon} />,
    },
    {
      title: t('Vehicle Latitude'),
      dataIndex: ['egoPos', 'lat'],
      search: false,
      render: (_, { egoPos: { lat } }) => <LonLatUnit data={lat} />,
    },
    {
      title: t('Reporting Time'),
      dataIndex: 'createTime',
      sorter: true,
      search: false,
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={sensorDataSharingList} />
    </BaseContainer>
  );
};

export default SensorDataSharing;

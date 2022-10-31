import React, { useRef } from 'react';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import BaseContainer from 'edge-src/components/BaseContainer';
import BaseProTable from 'edge-src/components/BaseProTable';
import { DSDEquipmentTypeOptions } from 'edge-src/utils/constants';
import { statusOptionFormat } from 'edge-src/utils';
import { sensorDataSharingList } from 'edge-src/services/event/sds';
import LonLatUnit from 'edge-src/components/LonLatUnit';

const SensorDataSharing: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: TableProColumns<Event.SDSListItem>[] = [
    { title: t('ID'), dataIndex: 'id' },
    { title: t('Message Number'), dataIndex: 'msgID' },
    {
      title: t('Equipment Type'),
      dataIndex: 'equipmentType',
      valueType: 'select',
      valueEnum: statusOptionFormat(DSDEquipmentTypeOptions),
      search: true,
    },
    {
      title: t('Sensor Longitude'),
      dataIndex: ['sensorPos', 'lon'],
      render: (_, { sensorPos: { lon } }) => <LonLatUnit data={lon} />,
    },
    {
      title: t('Sensor Latitude'),
      dataIndex: ['sensorPos', 'lat'],
      render: (_, { sensorPos: { lat } }) => <LonLatUnit data={lat} />,
    },
    { title: t('Millisecond Time'), dataIndex: 'secMark' },
    { title: t('Vehicle ID'), dataIndex: 'egoID' },
    {
      title: t('Vehicle Longitude'),
      dataIndex: ['egoPos', 'lon'],
      render: (_, { egoPos: { lon } }) => <LonLatUnit data={lon} />,
    },
    {
      title: t('Vehicle Latitude'),
      dataIndex: ['egoPos', 'lat'],
      render: (_, { egoPos: { lat } }) => <LonLatUnit data={lat} />,
    },
    {
      title: t('Reporting Time'),
      dataIndex: 'createTime',
      sorter: true,
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={sensorDataSharingList} />
    </BaseContainer>
  );
};

export default SensorDataSharing;

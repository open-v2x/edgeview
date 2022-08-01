import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import { CoordinationInfoTypeOptions, DriveBehaviorTypeOptions } from '@/utils/constants';
import { dataFormat, statusOptionFormat } from '@/utils';
import { overtakingWarningList } from '@/services/event/dnpw';
import LonLatUnit from '@/components/LonLatUnit';

const RoadSideCoordination: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Event.DNPWListItem>[] = [
    {
      title: t('ID'),
      dataIndex: 'id',
      search: false,
    },
    {
      title: t('Message Number'),
      dataIndex: 'msgID',
      search: false,
    },
    {
      title: t('Millisecond Time'),
      dataIndex: 'secMark',
      search: false,
    },
    {
      title: t('Longitude'),
      dataIndex: ['refPos', 'lon'],
      search: false,
      render: (_, { refPos: { lon } }) => <LonLatUnit data={lon} />,
    },
    {
      title: t('Latitude'),
      dataIndex: ['refPos', 'lat'],
      search: false,
      render: (_, { refPos: { lat } }) => <LonLatUnit data={lat} />,
    },
    {
      title: t('Target ID'),
      dataIndex: 'vehID',
      search: false,
    },
    {
      title: t('Driving Behavior'),
      dataIndex: ['driveSuggestion', 'suggestion'],
      valueType: 'select',
      valueEnum: statusOptionFormat(DriveBehaviorTypeOptions),
      search: false,
    },
    {
      title: t('Request Valid Time'),
      dataIndex: ['driveSuggestion', 'lifeTime'],
      search: false,
      render: (_, { driveSuggestion: { lifeTime } }) => dataFormat(lifeTime * 10, 'ms'),
    },
    {
      title: t('Coordination Information'),
      dataIndex: 'info',
      valueType: 'select',
      valueEnum: statusOptionFormat(CoordinationInfoTypeOptions),
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={overtakingWarningList} />
    </BaseContainer>
  );
};

export default RoadSideCoordination;

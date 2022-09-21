import React, { useRef } from 'react';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import { CoordinationInfoTypeOptions, DriveBehaviorTypeOptions } from '@/utils/constants';
import { dataFormat, statusOptionFormat } from '@/utils';
import { overtakingWarningList } from '@/services/event/dnpw';
import LonLatUnit from '@/components/LonLatUnit';

const RoadSideCoordination: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: TableProColumns<Event.DNPWListItem>[] = [
    {
      title: t('ID'),
      dataIndex: 'id',
    },
    {
      title: t('Message Number'),
      dataIndex: 'msgID',
    },
    {
      title: t('Millisecond Time'),
      dataIndex: 'secMark',
    },
    {
      title: t('Longitude'),
      dataIndex: ['refPos', 'lon'],
      render: (_, { refPos: { lon } }) => <LonLatUnit data={lon} />,
    },
    {
      title: t('Latitude'),
      dataIndex: ['refPos', 'lat'],
      render: (_, { refPos: { lat } }) => <LonLatUnit data={lat} />,
    },
    {
      title: t('Target ID'),
      dataIndex: 'vehID',
    },
    {
      title: t('Driving Behavior'),
      dataIndex: ['driveSuggestion', 'suggestion'],
      valueType: 'select',
      valueEnum: statusOptionFormat(DriveBehaviorTypeOptions),
    },
    {
      title: t('Request Valid Time'),
      dataIndex: ['driveSuggestion', 'lifeTime'],
      render: (_, { driveSuggestion: { lifeTime } }) => dataFormat(lifeTime * 10, 'ms'),
    },
    {
      title: t('Coordination Information'),
      dataIndex: 'info',
      valueType: 'select',
      valueEnum: statusOptionFormat(CoordinationInfoTypeOptions),
      search: true,
    },
    {
      title: t('Reporting Time'),
      dataIndex: 'createTime',
      sorter: true,
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={overtakingWarningList} />
    </BaseContainer>
  );
};

export default RoadSideCoordination;

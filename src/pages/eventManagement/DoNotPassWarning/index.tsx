import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import { CoordinationInfoTypeOptions, DriveBehaviorTypeOptions } from '@/utils/constants';
import { statusOptionFormat } from '@/utils';
import { overtakingWarningList } from '@/services/event/dnpw';

const RoadSideCoordination: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Event.RSMListItem>[] = [
    {
      title: t('ID'),
      dataIndex: 'id',
      search: false,
    },
    {
      title: t('Message Number'),
      dataIndex: 'msgCnt',
      search: false,
    },
    {
      title: t('Millisecond Time'),
      dataIndex: 'secMark',
      search: false,
    },
    {
      title: t('Longitude'),
      dataIndex: 'lon',
      search: false,
    },
    {
      title: t('Latitude'),
      dataIndex: 'lat',
      search: false,
    },
    {
      title: t('Target ID'),
      dataIndex: 'vehId',
      search: false,
    },
    {
      title: t('Driving Behavior'),
      dataIndex: 'suggestion',
      valueType: 'select',
      valueEnum: statusOptionFormat(DriveBehaviorTypeOptions),
    },
    {
      title: t('Lifecycle'),
      dataIndex: 'lifeTime',
      search: false,
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

import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import BaseProTable from '../BaseProTable';
import { statusOptionFormat } from '@/utils';
import { ICWCollisionTypeOptions } from '@/utils/constants';
import { intersectionCollisionWarningList } from '@/services/event/icw';
import LonLatUnit from '../LonLatUnit';

type CollisionWarningProps = {
  type: 'ICW' | 'VRUCW';
  navigator: (data: Event.ICWListItem) => void;
};

const CollisionWarningList: React.FC<CollisionWarningProps> = ({ type, navigator }) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Event.ICWListItem>[] = [
    { title: t('ID'), dataIndex: 'id', search: false },
    {
      title: t('Sensor Longitude'),
      dataIndex: ['sensorPos', 'lon'],
      render: (_, { sensorPos: { lon } }) => <LonLatUnit data={lon} />,
      search: false,
    },
    {
      title: t('Sensor Latitude'),
      dataIndex: ['sensorPos', 'lat'],
      render: (_, { sensorPos: { lat } }) => <LonLatUnit data={lat} />,
      search: false,
    },
    {
      title: t('Collision Type'),
      dataIndex: 'collisionType',
      valueType: 'select',
      valueEnum: statusOptionFormat(ICWCollisionTypeOptions),
    },
    { title: t('Millisecond Time'), dataIndex: 'secMark', search: false },
    {
      title: t('Operate'),
      width: 160,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <a key="details" onClick={() => navigator(row)}>
          {t('Details')}
        </a>,
      ],
    },
  ];
  return (
    <BaseProTable
      columns={columns}
      actionRef={actionRef}
      params={{ eventType: { ICW: 0, VRUCW: 1 }[type] }}
      request={intersectionCollisionWarningList}
    />
  );
};

export default CollisionWarningList;

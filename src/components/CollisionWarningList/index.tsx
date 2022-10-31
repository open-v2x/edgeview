import React, { useRef } from 'react';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import BaseProTable from '../BaseProTable';
import { statusOptionFormat } from 'edge-src/utils';
import { ICWCollisionTypeOptions } from 'edge-src/utils/constants';
import { intersectionCollisionWarningList } from 'edge-src/services/event/icw';
import LonLatUnit from '../LonLatUnit';

type CollisionWarningProps = {
  type: 'ICW' | 'VRUCW';
  navigator: (data: Event.ICWListItem) => void;
};

const CollisionWarningList: React.FC<CollisionWarningProps> = ({ type, navigator }) => {
  const actionRef = useRef<ActionType>();
  const columns: TableProColumns<Event.ICWListItem>[] = [
    { title: t('ID'), dataIndex: 'id' },
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
    {
      title: t('Collision Type'),
      dataIndex: 'collisionType',
      valueType: 'select',
      valueEnum: statusOptionFormat(ICWCollisionTypeOptions),
      search: true,
    },
    { title: t('Millisecond Time'), dataIndex: 'secMark' },
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
    {
      title: t('Reporting Time'),
      dataIndex: 'createTime',
      sorter: true,
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

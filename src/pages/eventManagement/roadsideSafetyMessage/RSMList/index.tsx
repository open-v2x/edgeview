import React, { useRef } from 'react';
import { history } from 'umi';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import BaseContainer from 'edge-src/components/BaseContainer';
import BaseProTable from 'edge-src/components/BaseProTable';
import { roadSideMessageList } from 'edge-src/services/event/rsm';
import { DataSourceOptions, ParticipantTypeOptions } from 'edge-src/utils/constants';
import { dataFormat, statusOptionFormat } from 'edge-src/utils';
import LonLatUnit from 'edge-src/components/LonLatUnit';

const RSMList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: TableProColumns<Event.RSMListItem>[] = [
    {
      title: t('Message ID'),
      dataIndex: 'id',
    },
    {
      title: t('Target ID'),
      dataIndex: 'ptcId',
    },
    {
      title: t('Participant Type'),
      dataIndex: 'ptcType',
      valueType: 'select',
      valueEnum: statusOptionFormat(ParticipantTypeOptions),
      search: true,
    },
    {
      title: t('Data Sources'),
      dataIndex: 'source',
      valueType: 'select',
      valueEnum: statusOptionFormat(DataSourceOptions),
    },
    {
      title: t('Millisecond Time'),
      dataIndex: 'secMark',
    },
    {
      title: t('Speed'),
      dataIndex: 'speed',
      render: (_, { speed }: Event.RSMListItem) => dataFormat(speed * 0.02 * 3.6, 'km/h'),
    },
    {
      title: t('Heading'),
      dataIndex: 'heading',
      render: (_, { heading }: Event.RSMListItem) => dataFormat(heading * 0.0125, '°'),
    },
    {
      title: t('Longitude'),
      dataIndex: 'lon',
      render: (_, { lon }: Event.RSMListItem) => <LonLatUnit data={lon} />,
    },
    {
      title: t('Latitude'),
      dataIndex: 'lat',
      render: (_, { lat }: Event.RSMListItem) => <LonLatUnit data={lat} />,
    },
    {
      title: t('Reporting Time'),
      dataIndex: 'createTime',
      sorter: true,
    },
    {
      title: t('Operate'),
      width: 160,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <a
          key="details"
          onClick={() =>
            history.push({
              pathname: `/event/rsm/details`,
              state: row,
            })
          }
        >
          {t('Details')}
        </a>,
      ],
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={roadSideMessageList} />
    </BaseContainer>
  );
};

export default RSMList;

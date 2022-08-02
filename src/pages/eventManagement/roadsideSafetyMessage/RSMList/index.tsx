import React, { useRef } from 'react';
import { history } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import { roadSideMessageList } from '@/services/event/rsm';
import { DataSourceOptions, ParticipantTypeOptions } from '@/utils/constants';
import { dataFormat, statusOptionFormat } from '@/utils';
import LonLatUnit from '@/components/LonLatUnit';

const RSMList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Event.RSMListItem>[] = [
    {
      title: t('Message ID'),
      dataIndex: 'id',
      search: false,
    },
    {
      title: t('Target ID'),
      dataIndex: 'ptcId',
      search: false,
    },
    {
      title: t('Participant Type'),
      dataIndex: 'ptcType',
      valueType: 'select',
      valueEnum: statusOptionFormat(ParticipantTypeOptions),
    },
    {
      title: t('Data Sources'),
      dataIndex: 'source',
      valueType: 'select',
      valueEnum: statusOptionFormat(DataSourceOptions),
      search: false,
    },
    {
      title: t('Millisecond Time'),
      dataIndex: 'secMark',
      search: false,
    },
    {
      title: t('Speed'),
      dataIndex: 'speed',
      search: false,
      render: (_, { speed }: Event.RSMListItem) => dataFormat(speed * 0.02 * 3.6, 'km/h'),
    },
    {
      title: t('Heading'),
      dataIndex: 'heading',
      search: false,
      render: (_, { heading }: Event.RSMListItem) => dataFormat(heading * 0.0125, '°'),
    },
    {
      title: t('Longitude'),
      dataIndex: 'lon',
      search: false,
      render: (_, { lon }: Event.RSMListItem) => <LonLatUnit data={lon} />,
    },
    {
      title: t('Latitude'),
      dataIndex: 'lat',
      search: false,
      render: (_, { lat }: Event.RSMListItem) => <LonLatUnit data={lat} />,
    },
    {
      title: t('Reporting Time'),
      dataIndex: 'createTime',
      sorter: true,
      search: false,
    },
  ];
  const optionColumn: ProColumns[] = [
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
      <BaseProTable
        columns={[...columns, ...optionColumn]}
        actionRef={actionRef}
        request={roadSideMessageList}
      />
    </BaseContainer>
  );
};

export default RSMList;

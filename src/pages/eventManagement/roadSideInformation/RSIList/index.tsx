import React, { useRef } from 'react';
import { history } from 'umi';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import { eventInfoList } from '@/services/event/rsi';
import { EventClassOptions, EventSourceOptions, EventTypeOptions } from '@/utils/constants';
import { dataFormat, statusOptionFormat } from '@/utils';

const RSIList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: TableProColumns<Event.RSIListItem>[] = [
    {
      title: t('Alert ID'),
      dataIndex: 'id',
    },
    {
      title: t('Event Duration'),
      dataIndex: 'duration',
    },
    {
      title: t('Event Classification'),
      dataIndex: 'eventClass',
      valueType: 'select',
      valueEnum: statusOptionFormat(EventClassOptions),
    },
    {
      title: t('Event Type'),
      dataIndex: 'eventType',
      valueType: 'select',
      valueEnum: statusOptionFormat(EventTypeOptions),
      search: true,
    },
    {
      title: t('Event Source'),
      dataIndex: 'eventSource',
      valueType: 'select',
      valueEnum: statusOptionFormat(EventSourceOptions),
    },
    {
      title: t('Event Confidence'),
      dataIndex: 'eventConfidence',
    },
    {
      title: t('Occurrence Area Radius'),
      dataIndex: 'eventRadius',
      render: (_, { eventRadius }: Event.RSIListItem) => dataFormat(eventRadius / 10, 'm'),
    },
    {
      title: t('Event Description'),
      dataIndex: 'eventDescription',
    },
    {
      title: t('Event Priority'),
      dataIndex: 'eventPriority',
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
        <a key="details" onClick={() => history.push(`/event/rsi/details/${row.id}`)}>
          {t('Details')}
        </a>,
      ],
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={eventInfoList} />
    </BaseContainer>
  );
};

export default RSIList;

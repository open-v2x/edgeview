import React, { useRef } from 'react';
import { history } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import { eventInfoList } from '@/services/event/rsi';
import { EventClassOptions, EventSourceOptions, EventTypeOptions } from '@/utils/constants';
import { dataFormat, statusOptionFormat } from '@/utils';

const RSIList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Event.RSIListItem>[] = [
    {
      title: t('Alert ID'),
      dataIndex: 'id',
      search: false,
    },
    {
      title: t('Event Duration'),
      dataIndex: 'duration',
      search: false,
    },
    {
      title: t('Event Classification'),
      dataIndex: 'eventClass',
      valueType: 'select',
      valueEnum: statusOptionFormat(EventClassOptions),
      search: false,
    },
    {
      title: t('Event Type'),
      dataIndex: 'eventType',
      valueType: 'select',
      valueEnum: statusOptionFormat(EventTypeOptions),
    },
    {
      title: t('Event Source'),
      dataIndex: 'eventSource',
      valueType: 'select',
      valueEnum: statusOptionFormat(EventSourceOptions),
      search: false,
    },
    {
      title: t('Event Confidence'),
      dataIndex: 'eventConfidence',
      search: false,
      render: (_, { eventConfidence }: Event.RSIListItem) => eventConfidence || '-',
    },
    {
      title: t('Occurrence Area Radius'),
      dataIndex: 'eventRadius',
      search: false,
      render: (_, { eventRadius }: Event.RSIListItem) => dataFormat(eventRadius / 10, 'm'),
    },
    {
      title: t('Event Description'),
      dataIndex: 'eventDescription',
      search: false,
    },
    {
      title: t('Event Priority'),
      dataIndex: 'eventPriority',
      search: false,
    },
    {
      title: t('Reporting Time'),
      dataIndex: 'createTime',
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
        <a key="details" onClick={() => history.push(`/event/rsi/details/${row.id}`)}>
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
        request={eventInfoList}
      />
    </BaseContainer>
  );
};

export default RSIList;

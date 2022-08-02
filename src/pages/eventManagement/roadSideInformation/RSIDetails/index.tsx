import React from 'react';
import { history, useRequest } from 'umi';
import ProCard from '@ant-design/pro-card';
import BaseContainer from '@/components/BaseContainer';
import CardList from '@/components/CardList';
import {
  Map,
  APILoader,
  ScaleControl,
  ToolBarControl,
  ControlBarControl,
  Marker,
} from '@uiw/react-amap';
import { EventClassOptions, EventSourceOptions, EventTypeOptions } from '@/utils/constants';
import { eventInfoDetail } from '@/services/event/rsi';
import { dataFormat } from '@/utils';

// 基本信息
const BasicInfo: React.FC<{ basicInfo: Event.RSIDetails | undefined }> = ({ basicInfo = {} }) => {
  const infoMap = [
    {
      key: 'eventClass',
      label: t('Event Classification'),
      render: ({ eventClass }: Event.RSIDetails) => EventClassOptions[eventClass],
    },
    {
      key: 'eventType',
      label: t('Event Type'),
      render: ({ eventType }: Event.RSIDetails) => EventTypeOptions[eventType],
    },
    {
      key: 'duration',
      label: t('Event Duration'),
    },
    {
      key: 'eventSource',
      label: t('Event Source'),
      render: ({ eventSource }: Event.RSIDetails) => EventSourceOptions[eventSource],
    },
    {
      key: 'eventConfidence',
      label: t('Event Confidence'),
      render: ({ eventConfidence }: Event.RSIDetails) => eventConfidence || '-',
    },
    {
      key: 'eventRadius',
      label: t('Occurrence Area Radius'),
      render: ({ eventRadius }: Event.RSIDetails) => dataFormat(eventRadius / 10, 'm'),
    },
    {
      key: 'eventDescription',
      label: t('Event Description'),
    },
    {
      key: 'eventPriority',
      label: t('Event Priority'),
    },
    {
      key: 'createTime',
      label: t('Reporting Time'),
    },
    {
      key: 'rsuName',
      label: t('Issued RSU'),
    },
  ];
  return (
    <ProCard title={t('Basic Information')}>
      <CardList infoMap={infoMap} info={basicInfo} xl={12} />
    </ProCard>
  );
};

const RSIDetails: React.FC<RouterMatchTypes> = ({ match: { params } }) => {
  if (!params.id) {
    history.goBack();
  }

  const { data } = useRequest(
    () => {
      return eventInfoDetail(+params.id);
    },
    { formatResult: (res) => res },
  );

  return (
    <BaseContainer back>
      <BasicInfo basicInfo={data} />
      <ProCard style={{ height: '500px' }}>
        <APILoader akay={process.env.AMAP_KEY}>
          <Map
            center={
              data?.eventPosition ? [data.eventPosition.lon, data.eventPosition.lat] : undefined
            }
          >
            <ControlBarControl offset={[20, 20]} position="RT" />
            <ScaleControl offset={[20, 30]} position="LB" />
            <ToolBarControl offset={[30, 30]} position="RB" />
            {data?.eventPosition && (
              <Marker position={[data.eventPosition.lon, data.eventPosition.lat]} />
            )}
          </Map>
        </APILoader>
      </ProCard>
    </BaseContainer>
  );
};

export default RSIDetails;

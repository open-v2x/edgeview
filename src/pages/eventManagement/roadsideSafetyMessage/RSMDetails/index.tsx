import React from 'react';
import { history } from 'umi';
import ProCard from '@ant-design/pro-card';
import BaseContainer from '@/components/BaseContainer';
import CardList from '@/components/CardList';
import { DataSourceOptions, ParticipantTypeOptions } from '@/utils/constants';

// 基本信息
const BasicInfo: React.FC<{ basicInfo: Event.RSMListItem | undefined }> = ({ basicInfo = {} }) => {
  const infoMap = [
    {
      key: 'id',
      label: t('Message ID'),
    },
    {
      key: 'ptcId',
      label: t('Target ID'),
    },
    {
      key: 'ptcType',
      label: t('Participant Type'),
      render: ({ ptcType }: Event.RSMListItem) => ParticipantTypeOptions[ptcType],
    },
    {
      key: 'source',
      label: t('Data Sources'),
      render: ({ source }: Event.RSMListItem) => DataSourceOptions[source],
    },
    {
      key: 'secMark',
      label: t('Millisecond Time'),
    },
    {
      key: 'speed',
      label: t('Speed'),
    },
    {
      key: 'heading',
      label: t('Heading'),
    },
    {
      key: 'lon',
      label: t('Longitude'),
    },
    {
      key: 'lat',
      label: t('Latitude'),
    },
    {
      key: 'createTime',
      label: t('Reporting Time'),
    },
  ];
  return (
    <ProCard title={t('Basic Information')}>
      <CardList infoMap={infoMap} info={basicInfo} xl={12} />
    </ProCard>
  );
};

const RSMDetails: React.FC<RouterMatchTypes> = ({ location: { state } }) => {
  if (!state) {
    history.goBack();
  }

  return (
    <BaseContainer back>
      <BasicInfo basicInfo={state as Event.RSMListItem} />
    </BaseContainer>
  );
};

export default RSMDetails;

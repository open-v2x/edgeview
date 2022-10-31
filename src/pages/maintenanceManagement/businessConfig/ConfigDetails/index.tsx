import React from 'react';
import { history, useRequest } from 'umi';
import ProCard from '@ant-design/pro-card';
import BaseContainer from 'edge-src/components/BaseContainer';
import CardList from 'edge-src/components/CardList';
import ParameterInfo from 'edge-src/components/ParameterInfo';
import ParameterDeviceList from 'edge-src/components/ParameterDeviceList';
import { parameterConfigInfo } from 'edge-src/services/config/business';

// 基本信息
type BasicInfoType = {
  name: string;
};
const BasicInfo: React.FC<{ basicInfo: BasicInfoType | undefined }> = ({ basicInfo = {} }) => {
  const infoMap = [
    {
      key: 'name',
      label: t('Configuration Name'),
    },
  ];
  return (
    <ProCard title={t('Basic Information')}>
      <CardList infoMap={infoMap} info={basicInfo} />
    </ProCard>
  );
};

const ConfigDetails: React.FC<RouterMatchTypes> = ({ match: { params } }) => {
  if (!+params.id) {
    history.goBack();
  }

  const { data } = useRequest(
    () => {
      return parameterConfigInfo(+params.id);
    },
    { formatResult: (res) => res },
  );

  return (
    <BaseContainer back>
      <BasicInfo basicInfo={data} />
      <ParameterInfo parameterInfo={data} />
      <ProCard title={t('Parameter Configuration Applicable RSU')}>
        <ParameterDeviceList showDeliveryStatus dataSource={data?.rsus || []} />
      </ProCard>
    </BaseContainer>
  );
};

export default ConfigDetails;

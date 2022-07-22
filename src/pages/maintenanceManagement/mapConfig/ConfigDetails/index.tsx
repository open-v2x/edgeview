import React, { useRef } from 'react';
import { history, useRequest } from 'umi';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { Button } from 'antd';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import OnlineStatus from '@/components/OnlineStatus';
import CardList from '@/components/CardList';
import CreateSendModal from '@/components/CreateSendModal';
import { DeviceOnlineStatusOptions, RSUStatusOptions, SendStatusOptions } from '@/utils/constants';
import { deleteMapRSU, downloadMapConfig, mapConfigInfo, mapRSUList } from '@/services/config/map';
import { FileTextOutlined } from '@ant-design/icons';
import { confirmModal } from '@/components/ConfirmModal';
import { downloadFile, statusOptionFormat } from '@/utils';

import styles from './index.less';

// 基本信息
const BasicInfo: React.FC<{ basicInfo: Config.MapListItem | undefined }> = ({ basicInfo = {} }) => {
  const getDownloadFile = async (id: number, name: string) => {
    const data = await downloadMapConfig(id);
    const dataStr =
      'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
    downloadFile(dataStr, `${name}.json`);
  };
  const infoMap = [
    {
      key: 'name',
      label: t('MAP Name'),
    },
    {
      key: 'countryName',
      label: t('MAP Area'),
      render: ({ countryName, provinceName, cityName, areaName }: Config.MapListItem) =>
        `${countryName}${provinceName}${cityName}${areaName}`,
    },
    {
      key: 'address',
      label: t('MAP Location'),
    },
    {
      key: 'file',
      label: t('MAP Data File'),
      render: ({ id, name }: Config.MapListItem) => {
        return (
          <a onClick={() => getDownloadFile(id, name)}>
            <FileTextOutlined style={{ marginRight: '6px' }} />
            {name}
          </a>
        );
      },
    },
    {
      key: 'preview',
      label: t('MAP Preview'),
      render: ({ id }: { id: number }) => (
        <Button
          type="link"
          size="small"
          onClick={() => history.push(`/maintenance/map/preview/${id}`)}
        >
          {t('Preview')}
        </Button>
      ),
    },
    {
      key: 'desc',
      label: t('Describe'),
      block: true,
    },
  ];
  return (
    <ProCard title={t('Basic information')}>
      <CardList infoMap={infoMap} info={basicInfo} />
    </ProCard>
  );
};

// 下发 RSU
const SendList: React.FC<{ mapId: number }> = ({ mapId }) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Config.MapRSUListItem>[] = [
    {
      title: t('RSU Name'),
      dataIndex: 'rsuName',
      ellipsis: true,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'rsuSn',
    },
    {
      title: t('Online Status'),
      dataIndex: 'onlineStatus',
      render: (statusName, row) => (
        <OnlineStatus status={row.onlineStatus} statusName={statusName} />
      ),
      valueType: 'select',
      valueEnum: statusOptionFormat(DeviceOnlineStatusOptions),
    },
    {
      title: t('Device Status'),
      dataIndex: 'rsuStatus',
      valueType: 'select',
      valueEnum: statusOptionFormat(RSUStatusOptions),
    },
    {
      title: t('Send Status'),
      dataIndex: 'deliveryStatus',
      render: (statusName, row) => (
        <OnlineStatus status={row.deliveryStatus === 1} statusName={statusName} />
      ),
      valueEnum: statusOptionFormat(SendStatusOptions),
    },
    {
      title: t('Creation Time'),
      dataIndex: 'createTime',
    },
    {
      title: t('Operate'),
      width: 140,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <a
          key="delete"
          onClick={() =>
            confirmModal({
              id: mapId,
              params: row.id,
              content: t('Are you sure you want to delete this device?'),
              modalFn: deleteMapRSU,
              actionRef,
            })
          }
        >
          {t('Delete')}
        </a>,
      ],
    },
  ];
  return (
    <ProCard title={t('Issue RSU')} className={styles.send}>
      <BaseProTable
        columns={columns}
        actionRef={actionRef}
        params={{ mapId }}
        request={mapRSUList}
        search={false}
        toolBarRender={() => [
          <CreateSendModal
            key="create"
            type="map"
            id={mapId}
            success={() => actionRef.current?.reload()}
          />,
        ]}
      />
    </ProCard>
  );
};

const ConfigDetails: React.FC<RouterMatchTypes> = ({ match: { params } }) => {
  const mapId = +params.id;
  if (!mapId) {
    history.goBack();
  }

  const { data } = useRequest(
    () => {
      return mapConfigInfo(mapId);
    },
    { formatResult: (res) => res },
  );

  return (
    <BaseContainer back>
      <BasicInfo basicInfo={data} />
      <SendList mapId={mapId} />
    </BaseContainer>
  );
};

export default ConfigDetails;

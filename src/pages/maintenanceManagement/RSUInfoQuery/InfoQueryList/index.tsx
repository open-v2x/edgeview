import React, { useRef } from 'react';
import { history } from 'umi';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import { QueryIntervalOptions, QueryTypeOptions } from '@/utils/constants';
import { deleteInfoQuery, infoQueryList } from '@/services/config/query';
import CreateQueryModal from './components/CreateQueryModal';
import { statusOptionFormat } from '@/utils';
import { deviceList } from '@/services/device/device';
import { Divider } from 'antd';
import { confirmModal } from '@/components/ConfirmModal';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName, rsuEsn }: Device.DeviceListItem) => ({
    label: `${rsuName}（Esn: ${rsuEsn}）`,
    value: id,
  }));
};

const InfoQueryList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: TableProColumns<Config.QueryListItem>[] = [
    {
      title: t('Query RSU'),
      dataIndex: 'rsus',
      render: (_, { rsus }) => rsus.map(({ rsuName }) => rsuName).join('、'),
    },
    {
      title: t('Query RSU'),
      dataIndex: 'rsuId',
      valueType: 'select',
      request: fetchDeviceList,
      hideInTable: true,
      search: true,
    },
    {
      title: t('Query Information Type'),
      dataIndex: 'queryType',
      valueType: 'select',
      valueEnum: statusOptionFormat(QueryTypeOptions),
    },
    {
      title: t('Query Information Time Interval'),
      dataIndex: 'timeType',
      valueType: 'select',
      valueEnum: statusOptionFormat(QueryIntervalOptions),
    },
    {
      title: t('Command Issue Time'),
      dataIndex: 'createTime',
    },
    {
      title: t('Operate'),
      width: 160,
      fixed: 'right',
      valueType: 'option',
      render: (_, { id, queryType }) => [
        <a
          key="details"
          onClick={() =>
            history.push({
              pathname: `/maintenance/query/details/${id}`,
              query: { type: queryType },
            })
          }
        >
          {t('Details')}
        </a>,
        <Divider key="delete-divider" type="vertical" />,
        <a
          key="delete"
          onClick={() =>
            confirmModal({
              id,
              content: t('Are you sure you want to delete this query?'),
              modalFn: deleteInfoQuery,
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
    <BaseContainer>
      <BaseProTable
        columns={columns}
        actionRef={actionRef}
        request={infoQueryList}
        toolBarRender={() => [
          <CreateQueryModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default InfoQueryList;

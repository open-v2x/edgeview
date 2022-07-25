import React, { useRef } from 'react';
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import type { ToolBarProps } from '@ant-design/pro-table/lib/components/ToolBar';
import type { TableProps } from 'antd';
import BaseProTable from '@/components/BaseProTable';
import OnlineStatus from '@/components/OnlineStatus';
import {
  DeviceOnlineStatusOptions,
  DeviceStatusOptions,
  SendStatusOptions,
} from '@/utils/constants';
import { statusOptionFormat } from '@/utils';

type ParameterDeviceListType = {
  showDeliveryStatus?: boolean;
  dataSource?: Device.DeviceListItem[];
  request?: (params: { pageSize?: number; current?: number }) => Promise<Partial<RequestData<any>>>;
  rowSelection?:
    | (TableProps<any>['rowSelection'] & {
        alwaysShowAlert?: boolean;
      })
    | false;
  pagination?: { pageSize: number };
  headerTitle?: string | React.ReactNode;
  toolBarRender?: ToolBarProps<any>['toolBarRender'] | false;
  deleteOperation?: (id: number) => void;
};

const ParameterDeviceList: React.FC<ParameterDeviceListType> = ({
  showDeliveryStatus,
  dataSource,
  request,
  rowSelection,
  pagination,
  headerTitle,
  toolBarRender,
  deleteOperation,
}) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Device.DeviceListItem>[] = [
    {
      title: t('RSU Name'),
      dataIndex: 'rsuName',
      ellipsis: true,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'rsuEsn',
    },
    {
      title: t('Installation Area'),
      dataIndex: 'location',
      ellipsis: true,
      render: (_, { countryName, provinceName, cityName, areaName }) =>
        `${countryName || ''}${provinceName || ''}${cityName || ''}${areaName || ''}`,
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
      valueEnum: statusOptionFormat(DeviceStatusOptions),
    },
  ];
  if (showDeliveryStatus) {
    columns.push({
      title: t('Send Status'),
      dataIndex: 'deliveryStatus',
      render: (statusName, row) => (
        <OnlineStatus status={row.deliveryStatus === 1} statusName={statusName} />
      ),
      valueEnum: statusOptionFormat(SendStatusOptions),
    });
  }
  const optionColumn: ProColumns[] = [
    {
      title: t('Operate'),
      width: 120,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <a key="delete" onClick={() => deleteOperation?.(row.id)}>
          {t('Delete')}
        </a>,
      ],
    },
  ];

  return (
    <BaseProTable
      columns={deleteOperation ? [...columns, ...optionColumn] : columns}
      actionRef={actionRef}
      dataSource={dataSource}
      request={request}
      rowSelection={rowSelection}
      search={false}
      pagination={pagination}
      headerTitle={headerTitle}
      toolBarRender={toolBarRender}
      options={false}
    />
  );
};

ParameterDeviceList.defaultProps = {
  dataSource: undefined,
  request: undefined,
  rowSelection: undefined,
  pagination: undefined,
  headerTitle: undefined,
  toolBarRender: undefined,
  deleteOperation: undefined,
};

export default ParameterDeviceList;

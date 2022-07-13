import React, { useRef } from 'react';
import { history } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Divider } from 'antd';
import BaseProTable from '@/components/BaseProTable';
import OnlineStatus from '@/components/OnlineStatus';
import CreateDeviceModal from '../CreateDeviceModal';
import { DeviceOnlineStatusOptions, DeviceStatusOptions } from '@/utils/constants';
import { deleteDevice, deviceList, updateDevice } from '@/services/device/device';
import Country from '@/components/Country';
import { confirmModal } from '@/components/ConfirmModal';
import { statusOptionFormat } from '@/utils';

const RegisteredList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Device.DeviceListItem>[] = [
    {
      title: t('RSU ID'),
      dataIndex: 'rsuId',
      search: false,
    },
    {
      title: t('RSU Name'),
      dataIndex: 'rsuName',
    },
    {
      title: t('Serial Number'),
      dataIndex: 'rsuEsn',
    },
    {
      title: t('RSU IP'),
      dataIndex: 'rsuIP',
      search: false,
    },
    {
      title: t('Installation Area'),
      dataIndex: 'countryName',
      render: (_, { countryName, provinceName, cityName, areaName, address }) =>
        `${countryName}${provinceName}${cityName}${areaName}${address}`,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        const status = form.getFieldValue('state');
        if (status !== 'open') {
          return <Country {...rest} />;
        }
        return defaultRender(_);
      },
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
      dataIndex: 'available',
      valueType: 'select',
      valueEnum: statusOptionFormat(DeviceStatusOptions),
    },
    {
      title: t('Creation Time'),
      dataIndex: 'createTime',
      search: false,
    },
  ];
  const optionColumn: ProColumns[] = [
    {
      title: t('Operate'),
      width: 260,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <CreateDeviceModal
          key="edit"
          editId={row.id}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <a key="details" onClick={() => history.push(`/device/rsu/details/${row.id}`)}>
          {t('Details')}
        </a>,
        <Divider key="details-divider" type="vertical" />,
        <a
          key="disabled"
          style={{ color: row.available ? '#E74040' : '' }}
          onClick={() =>
            confirmModal({
              id: row.id,
              params: { available: !row.available },
              title: row.available ? t('Disable') : t('Enable'),
              content: row.available
                ? t('Are you sure you want to disable this device?')
                : t('Are you sure you want to enable this device?'),
              successMsg: t('{{value}} successfully', { value: t('Status updated') }),
              modalFn: updateDevice,
              actionRef,
            })
          }
        >
          {row.available ? t('Disable') : t('Enable')}
        </a>,
        <Divider key="disabled-divider" type="vertical" />,
        <a
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this device?'),
              modalFn: deleteDevice,
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
    <BaseProTable
      columns={[...columns, ...optionColumn]}
      actionRef={actionRef}
      request={deviceList}
      toolBarRender={() => [
        <CreateDeviceModal key="create" success={() => actionRef.current?.reload()} />,
      ]}
    />
  );
};

export default RegisteredList;

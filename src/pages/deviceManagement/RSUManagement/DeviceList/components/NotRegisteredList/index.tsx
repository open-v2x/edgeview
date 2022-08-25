import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import BaseProTable from '@/components/BaseProTable';
import { deleteTemporaryDevice, notRegisterDeviceList } from '@/services/device/device';
import CreateDeviceModal from '../CreateDeviceModal';
import { Divider } from 'antd';
import { confirmModal } from '@/components/ConfirmModal';

const columns: ProColumns<Device.DeviceListItem>[] = [
  {
    title: t('RSU Name'),
    dataIndex: 'rsuName',
  },
  {
    title: t('Serial Number'),
    dataIndex: 'rsuEsn',
  },
  {
    title: t('Protocol Version'),
    dataIndex: 'version',
    search: false,
  },
];

const RegisteredList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const optionColumn: ProColumns[] = [
    {
      title: t('Operate'),
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <CreateDeviceModal
          key="edit"
          isRegister
          editInfo={row}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <a
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this device?'),
              modalFn: deleteTemporaryDevice,
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
      request={notRegisterDeviceList}
    />
  );
};

export default RegisteredList;

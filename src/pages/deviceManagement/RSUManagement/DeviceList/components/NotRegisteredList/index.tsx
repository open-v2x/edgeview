import React, { useRef } from 'react';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import BaseProTable from '@/components/BaseProTable';
import { deleteTemporaryDevice, notRegisterDeviceList } from '@/services/device/device';
import CreateDeviceModal from '../CreateDeviceModal';
import { Divider } from 'antd';
import { confirmModal } from '@/components/ConfirmModal';

const RegisteredList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: TableProColumns<Device.DeviceListItem>[] = [
    {
      title: t('RSU Name'),
      dataIndex: 'rsuName',
      search: true,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'rsuEsn',
      search: true,
    },
    {
      title: t('Protocol Version'),
      dataIndex: 'version',
    },
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
  return <BaseProTable columns={columns} actionRef={actionRef} request={notRegisterDeviceList} />;
};

export default RegisteredList;

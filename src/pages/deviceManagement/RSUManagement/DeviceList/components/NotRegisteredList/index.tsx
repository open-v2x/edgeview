import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import BaseProTable from '@/components/BaseProTable';
import { notRegisterDeviceList } from '@/services/device/device';
import CreateDeviceModal from '../CreateDeviceModal';

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

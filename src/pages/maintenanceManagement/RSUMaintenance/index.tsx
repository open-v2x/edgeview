import React, { useRef } from 'react';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import { maintenanceConfigList, sendMaintenanceConfig } from '@/services/config/maintenance';
import CreateMaintenanceModal from './components/CreateMaintenanceModal';
import { Divider, message } from 'antd';
import { RebootOptions } from '@/utils/constants';
import CreateSendModal from '@/components/CreateSendModal';
import { statusOptionFormat } from '@/utils';

const RSUMaintenance: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: TableProColumns<Config.MaintenanceListItem>[] = [
    {
      title: t('RSU Name'),
      dataIndex: 'rsuName',
      ellipsis: true,
      search: true,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'rsuEsn',
      search: true,
    },
    {
      title: t('Heartbeat Frequency'),
      dataIndex: 'hbRate',
      render: (heartbeat: string | number) => `${heartbeat}s`,
    },
    {
      title: t('Operating Frequency'),
      dataIndex: 'runningInfoRate',
      render: (heartbeat: string | number) => `${heartbeat}s`,
    },
    {
      title: t('Log Level'),
      dataIndex: 'logLevel',
    },
    {
      title: t('Whether To Reboot'),
      dataIndex: 'reboot',
      valueType: 'select',
      valueEnum: statusOptionFormat(RebootOptions),
    },
    {
      title: t('Address'),
      dataIndex: ['addressChg', 'cssUrl'],
    },
    {
      title: t('Timestamp'),
      dataIndex: ['addressChg', 'time'],
    },
    {
      title: t('Custom Configuration'),
      dataIndex: 'extendConfig',
    },
    {
      title: t('Operate'),
      width: 200,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <CreateMaintenanceModal
          key="edit"
          editInfo={row}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <a
          key="down"
          onClick={async () => {
            await sendMaintenanceConfig(row.id);
            message.success(t('{{value}} successfully', { value: t('Delivered') }));
            actionRef.current?.reload();
          }}
        >
          {t('Down')}
        </a>,
        <Divider key="down-divider" type="vertical" />,
        <CreateSendModal
          key="copy"
          type="rsu"
          id={row.id}
          success={() => actionRef.current?.reload()}
        />,
      ],
    },
  ];

  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={maintenanceConfigList} />
    </BaseContainer>
  );
};

export default RSUMaintenance;

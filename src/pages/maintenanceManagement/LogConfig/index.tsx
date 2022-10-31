import React, { useRef } from 'react';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import { Divider } from 'antd';
import BaseContainer from 'edge-src/components/BaseContainer';
import BaseProTable from 'edge-src/components/BaseProTable';
import CreateLogConfigModal from './components/CreateLogConfigModal';
import { deleteLogConfig, logConfigList } from 'edge-src/services/config/log';
import { confirmModal } from 'edge-src/components/ConfirmModal';

const LogConfig: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: TableProColumns<Config.LogListItem>[] = [
    {
      title: t('ID'),
      dataIndex: 'id',
    },
    {
      title: t('Log Upload Address'),
      dataIndex: 'uploadUrl',
    },
    {
      title: t('Log Server Username'),
      dataIndex: 'userId',
    },
    {
      title: t('Server Type'),
      dataIndex: 'transprotocal',
    },
    {
      title: t('Creation Time'),
      dataIndex: 'createTime',
    },
    {
      title: t('Operate'),
      width: 160,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <CreateLogConfigModal
          key="edit"
          editInfo={row}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <a
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this configuration?'),
              modalFn: deleteLogConfig,
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
        request={logConfigList}
        search={false}
        toolBarRender={() => [
          <CreateLogConfigModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default LogConfig;

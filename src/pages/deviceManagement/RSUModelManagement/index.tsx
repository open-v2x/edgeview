import React, { useRef } from 'react';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import { Divider } from 'antd';
import BaseContainer from 'edge-src/components/BaseContainer';
import BaseProTable from 'edge-src/components/BaseProTable';
import CreateModelModal from './components/CreateModelModal';
import { modelList, deleteModel } from 'edge-src/services/device/model';
import { confirmModal } from 'edge-src/components/ConfirmModal';

const RSUModelManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: TableProColumns<Device.ModelListItem>[] = [
    {
      title: t('Model Name'),
      dataIndex: 'name',
      ellipsis: true,
      search: true,
    },
    {
      title: t('Manufacturer Name'),
      dataIndex: 'manufacturer',
      ellipsis: true,
      search: true,
    },
    {
      title: t('Describe'),
      dataIndex: 'desc',
      ellipsis: true,
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
        <CreateModelModal key="edit" editId={row.id} success={() => actionRef.current?.reload()} />,
        <Divider key="disabled-divider" type="vertical" />,
        <a
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this model?'),
              modalFn: deleteModel,
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
        request={modelList}
        toolBarRender={() => [
          <CreateModelModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default RSUModelManagement;

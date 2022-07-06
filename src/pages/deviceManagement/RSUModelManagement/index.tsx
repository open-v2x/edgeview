import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Divider } from 'antd';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import CreateModelModal from './components/CreateModelModal';
import { modelList, deleteModel } from '@/services/device/model';
import { confirmModal } from '@/components/ConfirmModal';

const columns: ProColumns<Device.ModelListItem>[] = [
  {
    title: t('Model Name'),
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: t('Manufacturer Name'),
    dataIndex: 'manufacturer',
    ellipsis: true,
  },
  {
    title: t('Describe'),
    dataIndex: 'desc',
    search: false,
    ellipsis: true,
  },
  {
    title: t('Creation Time'),
    dataIndex: 'createTime',
    search: false,
  },
];

const RSUModelManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const optionColumn: ProColumns[] = [
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
        columns={[...columns, ...optionColumn]}
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

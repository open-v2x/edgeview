import React, { useRef } from 'react';
import { history } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Divider } from 'antd';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import CreateMapConfigModal from './components/CreateMapConfigModal';
import { deleteMapConfig, mapConfigList } from '@/services/config/map';
import Country from '@/components/Country';
import { confirmModal } from '@/components/ConfirmModal';

const ConfigList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Config.MapListItem>[] = [
    {
      title: t('MAP Name'),
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: t('MAP Area'),
      dataIndex: 'countryName',
      ellipsis: true,
      render: (_, { countryName, provinceName, cityName, areaName }) =>
        `${countryName}${provinceName}${cityName}${areaName}`,
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
      title: t('MAP Location'),
      dataIndex: 'address',
      search: false,
      ellipsis: true,
    },
    {
      title: t('Number Of Releases'),
      dataIndex: 'amount',
      search: false,
    },
  ];
  const optionColumn: ProColumns[] = [
    {
      title: t('Operate'),
      width: 180,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <CreateMapConfigModal
          key="edit"
          editId={row.id}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <a key="details" onClick={() => history.push(`/maintenance/map/details/${row.id}`)}>
          {t('Details')}
        </a>,
        <Divider key="details-divider" type="vertical" />,
        <a
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this configuration?'),
              modalFn: deleteMapConfig,
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
        request={mapConfigList}
        toolBarRender={() => [
          <CreateMapConfigModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default ConfigList;

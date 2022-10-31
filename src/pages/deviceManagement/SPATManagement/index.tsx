import BaseContainer from 'edge-src/components/BaseContainer';
import BaseProTable from 'edge-src/components/BaseProTable';
import { confirmModal } from 'edge-src/components/ConfirmModal';
import { renderAreaFormatName, renderAreaFormItem } from 'edge-src/components/Country/renderHelper';
import OnlineStatus from 'edge-src/components/OnlineStatus';
import { deviceList } from 'edge-src/services/device/device';
import { deleteSpat, enabledSpat, spatList } from 'edge-src/services/device/spat';
import { statusOptionFormat } from 'edge-src/utils';
import { DeviceOnlineStatusOptions, DeviceStatusOptions } from 'edge-src/utils/constants';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import { Divider } from 'antd';
import { useRef } from 'react';
import CreateSpatModal from './components/CreateSpatModal';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const SpatManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: TableProColumns<Device.SpatListItem>[] = [
    {
      title: t('SPAT Name'),
      dataIndex: 'name',
      search: true,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'intersectionId',
      search: true,
    },
    {
      title: t('SPAT IP'),
      dataIndex: 'spatIP',
    },

    {
      title: t('Installation Area'),
      dataIndex: 'countryName',
      render: (_, row) => renderAreaFormatName(row),
      renderFormItem: renderAreaFormItem,
      search: true,
      hideInTable: true,
    },
    {
      title: t('Associate RSU'),
      dataIndex: 'rsuId',
      valueType: 'select',
      request: fetchDeviceList,
      hideInTable: true,
      search: true,
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
      title: t('Device Enabled'),
      dataIndex: 'enabled',
      valueType: 'select',
      valueEnum: statusOptionFormat(DeviceStatusOptions),
    },
    {
      title: t('Point'),
      dataIndex: 'point',
    },
    {
      title: t('Operate'),
      width: 200,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <CreateSpatModal key="edit" editInfo={row} success={() => actionRef.current?.reload()} />,
        <Divider key="edit-divider" type="vertical" />,
        <a
          key="disabled"
          style={{ color: row.enabled ? '#E74040' : '' }}
          onClick={() =>
            confirmModal({
              id: row.id,
              params: { enabled: !row.enabled },
              title: row.enabled ? t('Disable') : t('Enable'),
              content: row.enabled
                ? t('Are you sure you want to disable this device?')
                : t('Are you sure you want to enable this device?'),
              successMsg: t('{{value}} successfully', { value: t('Status updated') }),
              modalFn: enabledSpat,
              actionRef,
            })
          }
        >
          {row.enabled ? t('Disable') : t('Enable')}
        </a>,
        <Divider key="disabled-divider" type="vertical" />,
        <CreateSpatModal
          key="details"
          isDetails={true}
          editInfo={row}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="details-divider" type="vertical" />,
        <a
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this SPAT?'),
              modalFn: deleteSpat,
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
        request={spatList}
        toolBarRender={() => [
          <CreateSpatModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default SpatManagement;

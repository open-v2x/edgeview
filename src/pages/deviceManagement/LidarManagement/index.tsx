import React, { useRef } from 'react';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import { Divider } from 'antd';
import BaseContainer from 'edge-src/components/BaseContainer';
import BaseProTable from 'edge-src/components/BaseProTable';
import { confirmModal } from 'edge-src/components/ConfirmModal';
import { deviceList } from 'edge-src/services/device/device';
import { deleteLidar, enabledLidar, lidarList } from 'edge-src/services/device/lidar';
import CreateLidarModal from './components/CreateLidarModal';
import { statusOptionFormat } from 'edge-src/utils';
import { DeviceStatusOptions } from 'edge-src/utils/constants';
import { renderAreaFormatName, renderAreaFormItem } from 'edge-src/components/Country/renderHelper';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const LidarManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: TableProColumns<Device.CameraListItem>[] = [
    {
      title: t('Lidar Name'),
      dataIndex: 'name',
      search: true,
      ellipsis: true,
      width: 100,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'sn',
      search: true,
      ellipsis: true,
      width: 100,
    },
    {
      title: t('Lidar IP'),
      dataIndex: 'lidarIP',
      width: 100,
      ellipsis: true,
    },
    {
      title: t('Lidar Connection URL'),
      dataIndex: 'wsUrl',
      width: 200,
      ellipsis: true,
    },
    {
      title: t('Installation Area'),
      dataIndex: 'countryName',
      render: (_, row) => renderAreaFormatName(row),
      renderFormItem: renderAreaFormItem,
      search: true,
      width: 150,
      ellipsis: true,
    },
    {
      title: t('Longitude'),
      dataIndex: 'lng',
    },
    {
      title: t('Latitude'),
      dataIndex: 'lat',
    },
    {
      title: t('Altitude (m)'),
      dataIndex: 'elevation',
    },
    {
      title: t('Orientation (°)'),
      dataIndex: 'towards',
    },
    {
      title: t('Point'),
      dataIndex: 'point',
    },
    {
      title: t('Pole'),
      dataIndex: 'pole',
    },
    {
      title: t('Device Status'),
      dataIndex: 'enabled',
      valueType: 'select',
      valueEnum: statusOptionFormat(DeviceStatusOptions),
    },
    {
      title: t('Associate RSU'),
      dataIndex: 'rsuName',
      valueType: 'select',
      request: fetchDeviceList,
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
      title: t('Creation Time'),
      dataIndex: 'createTime',
      width: 150,
    },
    {
      title: t('Operate'),
      width: 220,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <CreateLidarModal key="edit" editInfo={row} success={() => actionRef.current?.reload()} />,
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
              modalFn: enabledLidar,
              actionRef,
            })
          }
        >
          {row.enabled ? t('Disable') : t('Enable')}
        </a>,
        <Divider key="disabled-divider" type="vertical" />,
        <CreateLidarModal
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
              content: t('Are you sure you want to delete this lidar?'),
              modalFn: deleteLidar,
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
        request={lidarList}
        scroll={{ x: 1400 }}
        toolBarRender={() => [
          <CreateLidarModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default LidarManagement;

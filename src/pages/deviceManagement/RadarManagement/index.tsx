import React, { useRef } from 'react';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import { Divider } from 'antd';
import BaseContainer from 'edge-src/components/BaseContainer';
import BaseProTable from 'edge-src/components/BaseProTable';
import { deleteRadar, radarList } from 'edge-src/services/device/radar';
import CreateCameraModal from 'edge-src/components/CreateCameraModal';
import { confirmModal } from 'edge-src/components/ConfirmModal';
import { deviceList } from 'edge-src/services/device/device';
import { renderAreaFormatName, renderAreaFormItem } from 'edge-src/components/Country/renderHelper';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const RadarManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: TableProColumns<Device.CameraListItem>[] = [
    {
      title: t('Radar Name'),
      dataIndex: 'name',
      search: true,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'sn',
      search: true,
    },
    {
      title: t('Radar IP'),
      dataIndex: 'radarIP',
    },
    {
      title: t('Installation Area'),
      dataIndex: 'countryName',
      render: (_, row) => renderAreaFormatName(row),
      renderFormItem: renderAreaFormItem,
      search: true,
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
    },
    {
      title: t('Operate'),
      width: 200,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <CreateCameraModal
          key="edit"
          type="radar"
          editInfo={row}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <CreateCameraModal
          key="details"
          type="radar"
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
              content: t('Are you sure you want to delete this radar?'),
              modalFn: deleteRadar,
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
        request={radarList}
        toolBarRender={() => [
          <CreateCameraModal
            key="create"
            type="radar"
            success={() => actionRef.current?.reload()}
          />,
        ]}
      />
    </BaseContainer>
  );
};

export default RadarManagement;

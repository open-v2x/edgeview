import React, { useRef } from 'react';
import type { ActionType, TableProColumns } from '@ant-design/pro-table';
import { Divider } from 'antd';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import { cameraList, deleteCamera } from '@/services/device/camera';
import CreateCameraModal from '@/components/CreateCameraModal';
import { confirmModal } from '@/components/ConfirmModal';
import { deviceList } from '@/services/device/device';
import { renderAreaFormatName, renderAreaFormItem } from '@/components/Country/renderHelper';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const CameraManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: TableProColumns<Device.CameraListItem>[] = [
    {
      title: t('Camera Name'),
      dataIndex: 'name',
      search: true,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'sn',
      search: true,
    },
    {
      title: t('Video Stream URL'),
      dataIndex: 'streamUrl',
    },
    {
      title: t('Installation Area'),
      dataIndex: 'countryName',
      render: renderAreaFormatName,
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
          type="camera"
          editInfo={row}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <CreateCameraModal
          key="details"
          type="camera"
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
              content: t('Are you sure you want to delete this camera?'),
              modalFn: deleteCamera,
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
        request={cameraList}
        toolBarRender={() => [
          <CreateCameraModal
            key="create"
            type="camera"
            success={() => actionRef.current?.reload()}
          />,
        ]}
      />
    </BaseContainer>
  );
};

export default CameraManagement;

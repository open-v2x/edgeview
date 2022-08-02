import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Divider } from 'antd';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import { deleteRadar, radarList } from '@/services/device/radar';
import CreateCameraModal from '@/components/CreateCameraModal';
import { confirmModal } from '@/components/ConfirmModal';
import { deviceList } from '@/services/device/device';
import Country from '@/components/Country';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const RadarManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Device.CameraListItem>[] = [
    {
      title: t('Radar Name'),
      dataIndex: 'name',
    },
    {
      title: t('Serial Number'),
      dataIndex: 'sn',
    },
    {
      title: t('Radar IP'),
      dataIndex: 'radarIP',
      search: false,
    },
    {
      title: t('Installation Area'),
      dataIndex: 'countryName',
      render: (_, { countryName = '', provinceName = '', cityName = '', areaName = '' }) =>
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
      title: t('Longitude'),
      dataIndex: 'lng',
      search: false,
    },
    {
      title: t('Latitude'),
      dataIndex: 'lat',
      search: false,
    },
    {
      title: t('Altitude (m)'),
      dataIndex: 'elevation',
      search: false,
    },
    {
      title: t('Orientation (°)'),
      dataIndex: 'towards',
      search: false,
    },
    {
      title: t('Associate RSU'),
      dataIndex: 'rsuName',
      valueType: 'select',
      request: fetchDeviceList,
      search: false,
    },
    {
      title: t('Associate RSU'),
      dataIndex: 'rsuId',
      valueType: 'select',
      request: fetchDeviceList,
      hideInTable: true,
    },
    {
      title: t('Creation Time'),
      dataIndex: 'createTime',
      search: false,
    },
  ];
  const optionColumn: ProColumns[] = [
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
        columns={[...columns, ...optionColumn]}
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

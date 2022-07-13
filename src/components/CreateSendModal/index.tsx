import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { FormGroupType } from '@/components/typings';
import { deviceList } from '@/services/device/device';
import FormItem from '../FormItem';
import { createMapRSU } from '@/services/config/map';
import Modal from '../Modal';
import { copyMaintenanceConfig } from '@/services/config/maintenance';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName, rsuEsn }: Device.DeviceListItem) => ({
    label: `${rsuName}（Esn: ${rsuEsn}）`,
    value: id,
  }));
};

type CreateSendModalProps = CreateModalProps & {
  type: 'map' | 'rsu';
  id: number;
};

const CreateSendModal: React.FC<CreateSendModalProps> = ({ type, id, success }) => {
  const formItems: FormGroupType[] = [
    {
      key: 'rsus',
      children: [
        {
          type: 'select',
          required: true,
          name: 'rsus',
          label: t('RSU'),
          request: fetchDeviceList,
          fieldProps: { mode: 'multiple' },
          rules: [{ required: true, message: t('Please select an RSU device') }],
        },
      ],
    },
  ];
  return (
    <Modal
      title={type === 'map' ? t('Add the issued RSU') : t('Copy configuration')}
      trigger={
        <Button
          id="sendRSU"
          icon={type === 'map' ? <PlusOutlined /> : ''}
          type={type === 'map' ? 'primary' : 'link'}
        >
          {type === 'map' ? t('Down') : t('Copy')}
        </Button>
      }
      width={500}
      modalProps={{ maskClosable: false }}
      submitForm={async (values) => {
        await { map: createMapRSU, rsu: copyMaintenanceConfig }[type]?.(id, values);
        success();
      }}
      successMsg={t('{{value}} successfully', {
        value: type === 'map' ? t('Delivered') : t('Copy configuration'),
      })}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateSendModal;

import React from 'react';
import FormItem from '@/components/FormItem';
import type { FormGroupType } from '@/components/typings';
import { createLogConfig, updateLogConfig } from '@/services/config/log';
import { deviceList } from '@/services/device/device';
import { LogServerTypeOptions } from '@/utils/constants';
import Modal from '@/components/Modal';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName, rsuEsn }: Device.DeviceListItem) => ({
    label: `${rsuName}（Esn: ${rsuEsn}）`,
    value: id,
  }));
};

const CreateLogConfigModal: React.FC<CreateModalProps> = ({ editInfo, success }) => {
  const formItems: FormGroupType[] = [
    {
      key: 'uploadUrl',
      children: [
        {
          required: true,
          name: 'uploadUrl',
          label: t('Log Upload Address'),
          rules: [{ required: true, message: t('Please enter the log upload address') }],
        },
        {
          required: true,
          name: 'userId',
          label: t('Log Server Username'),
          fieldProps: { maxLength: 20 },
          rules: [{ required: true, message: t('Please enter the username of the log server') }],
        },
      ],
    },
    {
      key: 'password',
      children: [
        {
          type: 'password',
          required: true,
          name: 'password',
          label: t('Log Server Password'),
          fieldProps: { maxLength: 20 },
          rules: [{ required: true, message: t('Please enter the password of the log server') }],
        },
        {
          type: 'select',
          required: true,
          name: 'transprotocal',
          label: t('Server Type'),
          options: LogServerTypeOptions,
          rules: [{ required: true, message: t('Please select a server type') }],
        },
      ],
    },
    {
      key: 'rsus',
      children: [
        {
          type: 'select',
          required: true,
          name: 'rsus',
          label: t('RSU'),
          fieldProps: { mode: 'multiple' },
          request: fetchDeviceList,
          rules: [{ required: true, message: t('Please select an RSU device') }],
        },
      ],
    },
  ];
  return (
    <Modal
      title={editInfo ? t('Edit configuration') : t('Add configuration')}
      createTrigger={t('Add configuration')}
      submitForm={async (values: Config.CreateLogConfigParams) => {
        if (editInfo) {
          await updateLogConfig(editInfo.id, values);
        } else {
          await createLogConfig(values);
        }
        success();
      }}
      editId={editInfo?.id}
      request={async () => {
        const { uploadUrl, userId, password, transprotocal, rsus } = editInfo!;
        return {
          uploadUrl,
          userId,
          password,
          transprotocal,
          rsus: (rsus as []).map(({ id }: { id: number }) => id),
        };
      }}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateLogConfigModal;

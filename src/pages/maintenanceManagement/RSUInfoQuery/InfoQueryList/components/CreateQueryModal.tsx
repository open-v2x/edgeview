import React from 'react';
import type { FormGroupType } from '@/components/typings';
import Modal from '@/components/Modal';
import FormItem from '@/components/FormItem';
import { QueryIntervalOptions, QueryTypeOptions } from '@/utils/constants';
import { deviceList } from '@/services/device/device';
import { createQueryInstruction } from '@/services/config/query';
import { statusOptionFormat } from '@/utils';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ type: 'all' });
  return data.map(({ id, rsuName, rsuEsn }: Device.DeviceListItem) => ({
    label: `${rsuName}（Esn: ${rsuEsn}）`,
    value: id,
  }));
};

const CreateQueryModal: React.FC<CreateModalProps> = ({ success }) => {
  const formItems: FormGroupType[] = [
    {
      key: 'queryType',
      children: [
        {
          type: 'select',
          required: true,
          name: 'queryType',
          label: t('Query Information Type'),
          valueEnum: statusOptionFormat(QueryTypeOptions),
          rules: [{ required: true, message: t('Please select the query information type') }],
        },
      ],
    },
    {
      key: 'timeType',
      children: [
        {
          type: 'select',
          name: 'timeType',
          label: t('Query Information Time Interval'),
          valueEnum: statusOptionFormat(QueryIntervalOptions),
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
          label: t('Query RSU'),
          request: fetchDeviceList,
          fieldProps: { mode: 'multiple' },
          rules: [{ required: true, message: t('Please select an RSU device') }],
        },
      ],
    },
  ];
  return (
    <Modal
      title={t('Issue RSU information query command')}
      createTrigger={t('Query command')}
      width={500}
      submitForm={async (values: Config.CreateQueryParams) => {
        await createQueryInstruction(values);
        success();
      }}
      successMsg={t('The query command was issued successfully')}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateQueryModal;

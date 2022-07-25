import React from 'react';
import FormItem from '@/components/FormItem';
import type { FormGroupType } from '@/components/typings';
import { updateMaintenanceConfig } from '@/services/config/maintenance';
import { LogLevelOptions, RebootOptions } from '@/utils/constants';
import Modal from '@/components/Modal';
import { statusOptionFormat } from '@/utils';

const CreateMaintenanceModal: React.FC<CreateModalProps> = ({ editInfo, success }) => {
  const formItems: FormGroupType[] = [
    {
      key: 'hbRate',
      children: [
        {
          type: 'digit',
          name: 'hbRate',
          label: t('Heartbeat Frequency'),
          tooltip: t('HEARTBEAT_TIP'),
          fieldProps: { precision: 0, min: 0 },
        },
        {
          type: 'digit',
          name: 'runningInfoRate',
          label: t('Operating Frequency'),
          tooltip: t('HEARTBEAT_TIP'),
          fieldProps: { precision: 0, min: 0 },
        },
      ],
    },
    {
      key: 'logLevel',
      children: [
        {
          type: 'select',
          name: 'logLevel',
          label: t('Log Level'),
          options: LogLevelOptions,
        },
        {
          type: 'select',
          name: 'reboot',
          label: t('Whether To Reboot'),
          valueEnum: statusOptionFormat(RebootOptions),
        },
      ],
    },
    {
      key: 'cssUrl',
      children: [
        {
          name: ['addressChg', 'cssUrl'],
          label: t('Address'),
        },
        {
          type: 'digit',
          name: ['addressChg', 'time'],
          label: t('Timestamp'),
          tooltip: t('0=effective immediately >0=UTC timestamp'),
          fieldProps: { controls: false, precision: 0, min: 0 },
        },
      ],
    },
    {
      key: 'extendConfig',
      children: [
        {
          name: 'extendConfig',
          label: t('Custom Configuration'),
          fieldProps: {
            placeholder: `{"key": "${t('name')}", "value": "${t('value')}"}`,
          },
        },
      ],
    },
  ];
  return (
    <Modal
      title={t('Edit configuration')}
      submitForm={async (values: Config.MaintenanceItem) => {
        await updateMaintenanceConfig(editInfo!.id, values);
        success();
      }}
      editId={editInfo?.id}
      request={async () => {
        const { hbRate, runningInfoRate, logLevel, reboot, extendConfig, addressChg } = editInfo!;
        return {
          hbRate,
          runningInfoRate,
          logLevel,
          reboot,
          extendConfig,
          addressChg,
        };
      }}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateMaintenanceModal;

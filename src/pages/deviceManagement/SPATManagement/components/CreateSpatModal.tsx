import FormItem from '@/components/FormItem';
import Modal from '@/components/Modal';
import type { FormGroupType } from '@/components/typings';
import { deviceList } from '@/services/device/device';
import { createSpat, updateSpat } from '@/services/device/spat';
import { IPReg, LightStateOptions } from '@/utils/constants';
import React from 'react';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName, rsuEsn }: Device.DeviceListItem) => ({
    label: `${rsuName}（Esn: ${rsuEsn}）`,
    value: id,
  }));
};

const CreateSpatModal: React.FC<CreateModalProps> = ({ editInfo, isDetails = false, success }) => {
  const lowerType = t('spat');
  const upperType = t('SPAT');

  const formItems: FormGroupType[] = [
    {
      key: 'name',
      children: [
        {
          required: true,
          name: 'name',
          label: t('{{type}} Name', { type: upperType }),
          tooltip: t('RSU_NAME_TIP'),
          fieldProps: { maxLength: 64 },
          disabled: isDetails,
          rules: [
            { required: true, message: t('Please enter a {{type}} name', { type: lowerType }) },
            { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/, message: t('RSU_NAME_VALIDATE_MSG') },
          ],
        },
        {
          required: true,
          name: 'intersectionId',
          label: t('{{type}} Serial Number', { type: upperType }),
          tooltip: t('SERIAL_NUMBER_TIP'),
          fieldProps: { maxLength: 64 },
          disabled: isDetails,
          rules: [
            {
              required: true,
              message: t('Please enter the {{type}} serial number', { type: lowerType }),
            },
            { pattern: /^[a-zA-Z0-9_]+$/, message: t('SERIAL_NUMBER_VALIDATE_MSG') },
          ],
        },
      ],
    },
    {
      key: 'phase',
      children: [
        {
          type: 'digit',
          required: true,
          name: 'phaseId',
          label: t('PhaseId'),
          disabled: isDetails,
          min: 1,
          max: 255,
          rules: [{ required: true, message: t('Please input an phase id') }],
        },
        {
          type: 'select',
          required: true,
          name: 'light',
          label: t('Light State'),
          disabled: isDetails,
          options: LightStateOptions,
          rules: [{ required: true, message: t('Please select a light state') }],
        },
      ],
    },
    {
      key: 'rsuId',
      children: [
        {
          type: 'select',
          required: true,
          name: 'rsuId',
          label: t('Associate RSU'),
          disabled: isDetails,
          request: fetchDeviceList,
          rules: [{ required: true, message: t('Please select an associated RSU') }],
        },
        {
          name: 'spatIP',
          label: t('SPAT IP'),
          disabled: isDetails,
          rules: [
            { pattern: IPReg, message: t('Incorrect SPAT IP format') },
          ],
        },
      ],
    },
    {
      key: 'position',
      children: [
        {
          name: 'point',
          label: t('Point'),
          required: true,
          disabled: isDetails,
          rules: [{ required: true, message: t('Please input an Point') }],
        },
      ],
    },
  ];

  const modalTitle = () => {
    return isDetails
      ? t('{{type}} details', { type: upperType })
      : editInfo
      ? t('Edit {{type}}', { type: lowerType })
      : t('Add {{type}}', { type: lowerType });
  };

  return (
    <Modal
      title={modalTitle()}
      createTrigger={t('Add {{type}}', { type: lowerType })}
      editTrigger={isDetails ? t('Details') : ''}
      modalProps={{ className: 'overflow' }}
      submitForm={async (values) => {
        if (editInfo) {
          updateSpat(editInfo.id, values);
        } else {
          createSpat(values);
        }
        success();
      }}
      editId={editInfo?.id}
      isDetails={isDetails}
      request={async () => {
        return editInfo;
      }}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateSpatModal;

import React from 'react';
import FormItem from '@/components/FormItem';
import type { FormGroupType } from '@/components/typings';
import { deviceList } from '@/services/device/device';
import { createCamera, updateCamera } from '@/services/device/camera';
import { createRadar, updateRadar } from '@/services/device/radar';
import Modal from '../Modal';
import { IPReg } from '@/utils/constants';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ type: 'all' });
  return data.map(({ id, rsuName, rsuEsn }: Device.DeviceListItem) => ({
    label: `${rsuName}（Esn: ${rsuEsn}）`,
    value: id,
  }));
};

type CreateCameraProps = CreateModalProps & {
  type: 'camera' | 'radar';
};

const CreateCameraModal: React.FC<CreateCameraProps> = ({
  type,
  editInfo,
  isDetails = false,
  success,
}) => {
  const lowerType = type === 'camera' ? t('camera') : t('radar');
  const upperType = type === 'camera' ? t('Camera') : t('Radar');
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
          name: 'sn',
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
      key: 'lng',
      children: [
        {
          type: 'digit',
          required: true,
          name: 'lng',
          label: t('Longitude'),
          disabled: isDetails,
          min: Number.MIN_SAFE_INTEGER,
          fieldProps: { precision: 8 },
          rules: [{ required: true, message: t('Please enter longitude') }],
        },
        {
          type: 'digit',
          required: true,
          name: 'lat',
          label: t('Latitude'),
          disabled: isDetails,
          min: Number.MIN_SAFE_INTEGER,
          fieldProps: { precision: 8 },
          rules: [{ required: true, message: t('Please enter latitude') }],
        },
      ],
    },
    {
      key: 'elevation',
      children: [
        {
          type: 'digit',
          required: true,
          name: 'elevation',
          label: t('Altitude (m)'),
          disabled: isDetails,
          min: Number.MIN_SAFE_INTEGER,
          fieldProps: { precision: 2 },
          rules: [{ required: true, message: t('Please enter altitude') }],
        },
        {
          type: 'digit',
          required: true,
          name: 'towards',
          label: t('Orientation (°)'),
          disabled: isDetails,
          fieldProps: { precision: 2, max: 359.99 },
          rules: [{ required: true, message: t('Please enter an orientation') }],
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
      ],
    },
    {
      key: 'desc',
      children: [
        {
          type: 'textarea',
          width: 912,
          name: 'desc',
          label: t('Describe'),
          disabled: isDetails,
          fieldProps: { autoSize: { minRows: 3, maxRows: 5 } },
        },
      ],
    },
  ];
  if (type === 'camera') {
    formItems.splice(1, 0, {
      key: 'streamUrl',
      children: [
        {
          required: true,
          width: 912,
          name: 'streamUrl',
          label: t('Video Stream URL'),
          disabled: isDetails,
          rules: [
            {
              required: true,
              message: t('Please enter video stream URL'),
            },
          ],
        },
      ],
    });
  }
  if (type === 'radar') {
    formItems[3].children!.push({
      name: 'radarIP',
      label: t('Radar IP'),
      disabled: isDetails,
      rules: [{ pattern: IPReg, message: t('Incorrect radar IP format') }],
    });
  }

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
          await { camera: updateCamera, radar: updateRadar }[type](editInfo.id, values);
        } else {
          await { camera: createCamera, radar: createRadar }[type](values);
        }
        success();
      }}
      editId={editInfo?.id}
      isDetails={isDetails}
      request={async () => {
        const { name, sn, streamUrl, radarIP, lng, lat, elevation, towards, rsuId, desc } =
          editInfo!;
        return { name, sn, streamUrl, radarIP, lng, lat, elevation, towards, rsuId, desc };
      }}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateCameraModal;

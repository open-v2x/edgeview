import FormItem from 'edge-src/components/FormItem';
import Modal from 'edge-src/components/Modal';
import type { FormGroupType } from 'edge-src/components/typings';
import { deviceList } from 'edge-src/services/device/device';
import { createLidar, updateLidar } from 'edge-src/services/device/lidar';
import { IPReg, LatReg, LngReg } from 'edge-src/utils/constants';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName, rsuEsn }: Device.DeviceListItem) => ({
    label: `${rsuName}（Esn: ${rsuEsn}）`,
    value: id,
  }));
};

const CreateLidarModal: React.FC<CreateModalProps> = ({ editInfo, isDetails = false, success }) => {
  const lowerType = t('lidar');
  const upperType = t('Lidar');

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
          required: true,
          name: 'lng',
          label: t('Longitude'),
          disabled: isDetails,
          rules: [
            { required: true, message: t('Please enter longitude') },
            { pattern: LngReg, message: t('Incorrect longitude format') },
          ],
        },
        {
          required: true,
          name: 'lat',
          label: t('Latitude'),
          disabled: isDetails,
          rules: [
            { required: true, message: t('Please enter latitude') },
            { pattern: LatReg, message: t('Incorrect latitude format') },
          ],
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
        {
          name: 'lidarIP',
          label: t('Lidar IP'),
          required: true,
          disabled: isDetails,
          rules: [
            { required: true, message: t('Please input an lidar IP') },
            { pattern: IPReg, message: t('Incorrect lidar IP format') },
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
        {
          name: 'pole',
          label: t('Pole'),
          required: true,
          disabled: isDetails,
          rules: [{ required: true, message: t('Please input an Pole') }],
        },
      ],
    },
    {
      key: 'wsUrl',
      children: [
        {
          required: true,
          width: 912,
          name: 'wsUrl',
          label: t('Lidar URL'),
          disabled: isDetails,
          rules: [
            {
              required: true,
              message: t('Please enter lidar URL'),
            },
          ],
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
          updateLidar(editInfo.id, values);
        } else {
          createLidar(values);
        }
        success();
      }}
      editId={editInfo?.id}
      isDetails={isDetails}
      request={async () => {
        const { name, sn, lng, lat, elevation, towards, rsuId, lidarIP, point, pole, desc, wsUrl } =
          editInfo!;
        return { name, sn, lng, lat, elevation, towards, rsuId, lidarIP, point, pole, desc, wsUrl };
      }}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateLidarModal;

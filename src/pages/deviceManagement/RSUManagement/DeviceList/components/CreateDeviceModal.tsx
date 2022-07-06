import React from 'react';
import FormItem from '@/components/FormItem';
import { createDevice, deviceInfo, updateDevice } from '@/services/device/device';
import { modelList } from '@/services/device/model';
import Country from '@/components/Country';
import type { FormGroupType } from '@/components/typings';
import Modal from '@/components/Modal';
import { IPReg } from '@/utils/constants';

const fetchModelList = async () => {
  const {
    data: { data },
  } = await modelList({ pageNum: 1, pageSize: 999 });
  return data.map(({ id, name }: Device.ModelListItem) => ({ label: name, value: id }));
};

const CreateDeviceModal: React.FC<CreateModalProps & { isRegister?: boolean }> = ({
  editId,
  editInfo,
  isRegister = false,
  success,
}) => {
  const formItems: FormGroupType[] = [
    {
      key: 'rsuName',
      children: [
        {
          required: true,
          name: 'rsuName',
          label: t('RSU Name'),
          tooltip: t('RSU_NAME_TIP'),
          fieldProps: { maxLength: 64 },
          disabled: isRegister,
          rules: [
            { required: true, message: t('Please enter an RSU name') },
            { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/, message: t('RSU_NAME_VALIDATE_MSG') },
          ],
        },
        {
          required: true,
          name: 'rsuEsn',
          label: t('Serial Number'),
          tooltip: t('SERIAL_NUMBER_TIP'),
          fieldProps: { maxLength: 64 },
          disabled: isRegister,
          rules: [
            { required: true, message: t('Please enter the RSU serial number') },
            { pattern: /^[a-zA-Z0-9_]+$/, message: t('SERIAL_NUMBER_VALIDATE_MSG') },
          ],
        },
      ],
    },
    {
      key: 'province',
      children: [
        {
          name: 'province',
          components: (
            <Country
              key="province"
              required
              width="lg"
              label={t('Installation Area')}
              name="province"
              rules={[{ required: true, message: t('Please select an installation area') }]}
            />
          ),
        },
        {
          required: true,
          name: 'address',
          label: t('Specific Location'),
          fieldProps: { maxLength: 64 },
          rules: [{ required: true, message: t('Please enter a specific location') }],
        },
      ],
    },
    {
      key: 'rsuId',
      children: [
        {
          required: true,
          name: 'rsuId',
          label: t('RSU ID'),
          fieldProps: { maxLength: 64 },
          disabled: isRegister,
          rules: [{ required: true, message: t('Please enter RSU ID') }],
        },
        {
          required: true,
          name: 'rsuIP',
          label: t('RSU IP'),
          rules: [
            { required: true, message: t('Please enter RSU IP') },
            { pattern: IPReg, message: t('Incorrect RSU IP format') },
          ],
        },
      ],
    },
    {
      key: 'rsuModelId',
      children: [
        {
          type: 'select',
          width: 912,
          name: 'rsuModelId',
          label: t('RSU Model'),
          request: fetchModelList,
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
          fieldProps: { autoSize: { minRows: 3, maxRows: 5 } },
        },
      ],
    },
  ];
  return (
    <Modal
      title={isRegister ? t('Register') : editId ? t('Edit RSU device') : t('Add RSU device')}
      createTrigger={isRegister ? '' : t('Add RSU')}
      editTrigger={isRegister ? t('Register') : ''}
      submitForm={async ({ province, ...values }: Device.CreateDeviceParams) => {
        values.areaCode = province!.pop()!;
        if (!isRegister && editId) {
          await updateDevice(editId, values);
        } else {
          await createDevice(isRegister ? { tmpId: editInfo!.id, ...values } : values);
        }
        success();
      }}
      successMsg={isRegister ? t('{{value}} successfully', { value: t('Registered') }) : ''}
      editId={isRegister ? editInfo?.id : editId}
      request={async ({ id }) => {
        if (isRegister) {
          const { rsuEsn, rsuId, rsuName } = editInfo!;
          return { rsuEsn, rsuId, rsuName };
        }
        const data = await deviceInfo(id);
        const { provinceCode, countryCode, cityCode, areaCode } = data;
        const province = [countryCode!, provinceCode!, cityCode!, areaCode];
        return { province, ...data };
      }}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateDeviceModal;

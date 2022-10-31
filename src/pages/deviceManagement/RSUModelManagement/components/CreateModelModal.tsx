import React from 'react';
import { createModel, modelInfo, updateModel } from 'edge-src/services/device/model';
import FormItem from 'edge-src/components/FormItem';
import type { FormGroupType } from 'edge-src/components/typings';
import Modal from 'edge-src/components/Modal';

const CreateModelModal: React.FC<CreateModalProps> = ({ editId, success }) => {
  const formItems: FormGroupType[] = [
    {
      key: 'name',
      children: [
        {
          required: true,
          name: 'name',
          label: t('RSU Device Model'),
          tooltip: t('RSU_NAME_TIP'),
          fieldProps: { maxLength: 64 },
          rules: [
            { required: true, message: t('Please enter the RSU device model') },
            { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]+$/, message: t('RSU_NAME_VALIDATE_MSG') },
          ],
        },
        {
          required: true,
          name: 'manufacturer',
          label: t('Manufacturer'),
          tooltip: t('RSU_MANUFACTURER_TIP'),
          fieldProps: { maxLength: 64 },
          rules: [
            { required: true, message: t('Please enter device manufacturer') },
            {
              pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
              message: t('RSU_MANUFACTURER_VALIDATE_MSG'),
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
          fieldProps: { autoSize: { minRows: 3, maxRows: 5 } },
        },
      ],
    },
  ];
  return (
    <Modal
      title={editId ? t('Edit RSU model') : t('Add RSU model')}
      createTrigger={t('Add model')}
      submitForm={async (values) => {
        if (editId) {
          await updateModel(editId, values);
        } else {
          await createModel(values);
        }
        success();
      }}
      editId={editId}
      request={async ({ id }) => await modelInfo(id)}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateModelModal;

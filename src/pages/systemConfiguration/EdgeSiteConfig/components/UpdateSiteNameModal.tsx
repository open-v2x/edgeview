import React from 'react';
import { Button } from 'antd';
import type { FormGroupType } from '@/components/typings';
import Modal from '@/components/Modal';
import FormItem from '@/components/FormItem';

const UpdateSiteNameModal: React.FC<CreateModalProps & { name: string }> = ({
  name = '',
  success,
}) => {
  const formItems: FormGroupType[] = [
    {
      key: 'rsus',
      children: [
        {
          required: true,
          name: 'name',
          label: t('Edge Site Name'),
          rules: [{ required: true, message: t('Please enter an edge site name') }],
        },
      ],
    },
  ];
  return (
    <Modal
      title={t('Modify edge site name')}
      trigger={
        <Button type="primary" style={{ width: '94px' }}>
          {t('Modify')}
        </Button>
      }
      width={500}
      modalProps={{ maskClosable: false }}
      submitForm={async () => {
        // values
        // await (id, values);
        success();
      }}
      successMsg={t('{{value}} successfully', { value: t('Modify') })}
      params={{ name }}
      request={async () => ({ name })}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default UpdateSiteNameModal;

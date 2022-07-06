import React from 'react';
import { Button } from 'antd';
import type { FormGroupType } from '@/components/typings';
import Modal from '@/components/Modal';
import FormItem from '@/components/FormItem';
import { IPReg } from '@/utils/constants';

type UpdateSiteConfigProps = CreateModalProps & {
  info?: { host: string; port: string; username: string; password: string };
};

const UpdateSiteConfigModal: React.FC<UpdateSiteConfigProps> = ({ info = {}, success }) => {
  const tipStyle = {
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.85)',
    lineHeight: '20px',
  };
  const formItems: FormGroupType[] = [
    {
      key: 'host',
      children: [
        {
          required: true,
          name: 'host',
          label: 'Host',
          rules: [
            { required: true, message: t('Please enter host') },
            { pattern: IPReg, message: t('Incorrect host format') },
          ],
        },
        {
          required: true,
          name: 'port',
          label: 'Port',
          rules: [{ required: true, message: t('Please enter port') }],
        },
      ],
    },
    {
      key: 'username',
      children: [
        {
          required: true,
          name: 'username',
          label: t('Username'),
          rules: [{ required: true, message: t('Please enter username') }],
        },
        {
          type: 'password',
          required: true,
          name: 'password',
          label: t('Password'),
          rules: [{ required: true, message: t('Please enter password') }],
        },
      ],
    },
  ];
  return (
    <Modal
      title={t('Cloud control center connection configuration')}
      trigger={
        <Button type="primary" style={{ width: '94px' }}>
          {t('Configure')}
        </Button>
      }
      modalProps={{ maskClosable: false }}
      submitForm={async () => {
        // values
        // await (id, values);
        success();
      }}
      successMsg={t('{{value}} successfully', { value: t('Modify') })}
      params={info.host ? { host: info.host } : undefined}
      request={async () => info}
    >
      <p style={tipStyle}>{t('Please enter the relevant information of the MQTT server')}</p>
      <FormItem items={formItems} />
    </Modal>
  );
};

export default UpdateSiteConfigModal;

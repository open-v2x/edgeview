import React, { useState } from 'react';
import { message } from 'antd';
import ProCard from '@ant-design/pro-card';
import ParameterDeviceList from 'edge-src/components/ParameterDeviceList';
import FormItem from 'edge-src/components/FormItem';
import FormField from 'edge-src/components/FormField';
import SelectDeviceModal from '../SelectDeviceModal';
import type { FormGroupType, FormItemType } from 'edge-src/components/typings';
import {
  createParameterConfig,
  parameterConfigInfo,
  updateParameterConfig,
} from 'edge-src/services/config/business';
import Modal from 'edge-src/components/Modal';
import { statusOptionFormat } from 'edge-src/utils';
import { SampleModeOptions } from 'edge-src/utils/constants';

import styles from './index.less';

const CreateRSUConfigModal: React.FC<CreateModalProps> = ({ editId, success }) => {
  const [defaultSelectedIds, setDefaultSelectedIds] = useState<number[]>([]);
  const [deviceList, setDeviceList] = useState<Device.DeviceListItem[]>([]);
  const getSelectedData = (data: Device.DeviceListItem[]) => {
    const list = [...deviceList, ...data];
    setDefaultSelectedIds(list.map(({ id }) => id));
    setDeviceList(list);
  };

  const upFiltersMsg = '{"key1": "value1", "key2": "value2"}';
  const upFiltersProps = {
    fieldProps: { placeholder: upFiltersMsg },
    rules: [
      {
        validator: (_: unknown, value: string) => {
          const addon = t('Filter rule format');
          const err = new Error(`${addon}: ${upFiltersMsg}`);
          if (value) {
            if (!value.startsWith('{') || !value.endsWith('}') || value === '{}') {
              return Promise.reject(err);
            } else {
              try {
                JSON.parse(value);
                return Promise.resolve();
              } catch (error) {
                return Promise.reject(err);
              }
            }
          }
          return Promise.resolve();
        },
      },
    ],
  };
  const configMap: { title: string; children: FormItemType[] }[] = [
    {
      title: t('BSM_CONFIG'),
      children: [
        {
          type: 'radio',
          required: true,
          name: ['bsm', 'sampleMode'],
          label: t('Sampling Method'),
          valueEnum: statusOptionFormat(SampleModeOptions),
          rules: [{ required: true, message: t('Please enter the sampling method') }],
        },
        {
          type: 'digit',
          required: true,
          name: ['bsm', 'sampleRate'],
          label: t('Sampling Rate'),
          tooltip: t('0 means no forwarding is required'),
          fieldProps: {
            addonAfter: t('bars/s'),
            precision: 0,
            max: 10000,
          },
          rules: [{ required: true, message: t('Please enter sample rate') }],
        },
        {
          type: 'digit',
          required: true,
          name: ['bsm', 'upLimit'],
          label: t('Forwarding Limit'),
          tooltip: t('FORWARDING_LIMIT_TIP'),
          fieldProps: {
            addonAfter: t('bars/s'),
            precision: 0,
            max: 10000,
          },
          rules: [
            { required: true, message: t('Please enter the upper limit of upstream forwarding') },
          ],
        },
        {
          name: ['bsm', 'upFilters'],
          label: t('Filter Rules'),
          ...upFiltersProps,
        },
      ],
    },
    {
      title: t('RSI_CONFIG'),
      children: [
        {
          name: ['rsi', 'upFilters'],
          label: t('Filter Rules'),
          ...upFiltersProps,
        },
      ],
    },
    {
      title: t('RSM_CONFIG'),
      children: [
        {
          type: 'digit',
          required: true,
          name: ['rsm', 'upLimit'],
          label: t('Forwarding Limit'),
          tooltip: t('FORWARDING_LIMIT_TIP'),
          fieldProps: {
            addonAfter: t('bars/s'),
            precision: 0,
            max: 10000,
          },
          rules: [
            { required: true, message: t('Please enter the upper limit of upstream forwarding') },
          ],
        },
        {
          name: ['rsm', 'upFilters'],
          label: t('Filter Rules'),
          ...upFiltersProps,
        },
      ],
    },
    {
      title: t('MAP_CONFIG'),
      children: [
        {
          type: 'digit',
          required: true,
          name: ['map', 'upLimit'],
          label: t('Forwarding Limit'),
          tooltip: t('FORWARDING_LIMIT_TIP'),
          fieldProps: {
            addonAfter: t('bars/s'),
            precision: 0,
            max: 10000,
          },
          rules: [
            { required: true, message: t('Please enter the upper limit of upstream forwarding') },
          ],
        },
        {
          name: ['map', 'upFilters'],
          label: t('Filter Rules'),
          ...upFiltersProps,
        },
      ],
    },
    {
      title: t('SPAT_CONFIG'),
      children: [
        {
          type: 'digit',
          required: true,
          name: ['spat', 'upLimit'],
          label: t('Forwarding Limit'),
          tooltip: t('FORWARDING_LIMIT_TIP'),
          fieldProps: {
            addonAfter: t('bars/s'),
            precision: 0,
            max: 10000,
          },
          rules: [
            { required: true, message: t('Please enter the upper limit of upstream forwarding') },
          ],
        },
        {
          name: ['spat', 'upFilters'],
          label: t('Filter Rules'),
          ...upFiltersProps,
        },
      ],
    },
  ];
  const formItems: FormGroupType[] = [
    {
      key: 'basic',
      title: t('Basic Information'),
      children: [
        {
          required: true,
          name: 'name',
          label: t('Configuration Name'),
          fieldProps: { maxLength: 64 },
          rules: [{ required: true, message: t('Please enter a configuration name') }],
        },
      ],
    },
    {
      key: 'template',
      title: t('Parameter Configuration Template'),
      components: configMap.map(({ title, children }) => (
        <ProCard key={title} bordered className="parameter-info">
          <div className="parameter-title t-center">{title}</div>
          <FormField items={children} />
        </ProCard>
      )),
    },
    {
      key: 'device',
      components: (
        <ParameterDeviceList
          dataSource={deviceList}
          headerTitle={
            <div className="ant-pro-form-group-title">
              {t('Parameter Configuration Applicable RSU')}
            </div>
          }
          pagination={{ pageSize: 5 }}
          toolBarRender={() => [
            <SelectDeviceModal
              key="select"
              defaultSelectedIds={defaultSelectedIds}
              selected={getSelectedData}
            />,
          ]}
          deleteOperation={(id: number) => {
            const list = deviceList.filter((item) => item.id !== id);
            setDefaultSelectedIds(list.map((item) => item.id));
            setDeviceList(list);
          }}
        />
      ),
    },
  ];

  const dataProcess = (data: string, func: (item: string) => string) => {
    return data.slice(1, -1).split(',').map(func).join(',');
  };

  return (
    <Modal
      className={styles.template}
      title={editId ? t('Edit configuration') : t('Add configuration')}
      createTrigger={t('Add configuration')}
      width={1200}
      layout="horizontal"
      omitNil={false}
      modalProps={{ className: 'overflow' }}
      submitForm={async ({ name, ...values }) => {
        Object.values(values as Record<string, Record<string, string | undefined>>).map((value) => {
          if (value.upFilters) {
            const json = dataProcess(value.upFilters, (item: string) => `{${item}}`);
            value.upFilters = JSON.parse(`[${json}]`);
          } else {
            value.upFilters = undefined;
          }
        });
        if (deviceList.length === 0) {
          message.warn(t('Please configure the RSU to which the parameters apply'));
          return false;
        }
        const rusIds = deviceList.map((item) => item.id);
        if (editId) {
          await updateParameterConfig(editId, { name, rsus: rusIds, ...values });
        } else {
          await createParameterConfig({ name, rsus: rusIds, ...values });
        }
        success();
      }}
      finishFailed={({ errorFields: [error] }) => {
        const [errorText] = error?.errors;
        if (errorText) {
          message.error(errorText);
        }
      }}
      editId={editId}
      request={async ({ id }) => {
        const {
          name,
          bsmConfig: bsm,
          rsiConfig: rsi,
          rsmConfig: rsm,
          mapConfig: map,
          spatConfig: spat,
          rsus = [],
        } = await parameterConfigInfo(id);
        const values = { bsm, rsi, rsm, map, spat };
        Object.values(values).map((value) => {
          if (value.upFilters) {
            const data = JSON.stringify(value.upFilters);
            const jsonStr = dataProcess(data, (item: string) => item.slice(1, -1));
            value.upFilters = `{${jsonStr}}`;
          }
        });
        setDefaultSelectedIds(rsus.map(({ id: rId }: { id: number }) => rId));
        setDeviceList(rsus);
        return { name, ...values };
      }}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateRSUConfigModal;

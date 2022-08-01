import React, { useRef } from 'react';
import { history } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Divider, Tooltip } from 'antd';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import CreateRSUConfigModal from './components/CreateRSUConfigModal';
import { deleteParameterConfig, parameterConfigList } from '@/services/config/business';
import { confirmModal } from '@/components/ConfirmModal';
import { SampleModeOptions } from '@/utils/constants';

type ParameterInfoType = {
  infoMap: InfoMapType[];
  info: React.ReactNode;
};

type ParameterType = {
  key: string;
  label: string;
  span: number;
  render?: (data: string) => void;
  unit?: string;
};

const ParameterInfo: React.FC<ParameterInfoType> = ({ infoMap, info }) => {
  return (
    <>
      {infoMap.map(({ key, label, unit, render }) => {
        const value = info![key];
        const text = `${label}：${render?.(value) || value || '-'} ${
          value ? unit ?? t('bars/s') : ''
        }`;
        return (
          <div key={key} className="ellipsis">
            <Tooltip title={text}>{text}</Tooltip>
          </div>
        );
      })}
    </>
  );
};

const ConfigList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const upsideCapMap: ParameterType[] = [
    {
      key: 'upLimit',
      label: t('Forwarding Limit'),
      span: 24,
    },
  ];
  const rsiMap: ParameterType[] = [
    {
      key: 'upFilters',
      label: t('Filter Rules'),
      span: 24,
      render: (upFilters: string) => upFilters && JSON.stringify(upFilters),
      unit: '',
    },
  ];
  const spatMap: ParameterType[] = [...upsideCapMap, ...rsiMap];
  const bsmMap: ParameterType[] = [
    {
      key: 'sampleMode',
      label: t('Sampling Method'),
      span: 12,
      render: (sampleMode: string) => SampleModeOptions[sampleMode],
      unit: '',
    },
    {
      key: 'sampleRate',
      label: t('Sampling Rate'),
      span: 12,
    },
    ...upsideCapMap,
    ...rsiMap,
  ];

  const columns: ProColumns<Config.ParameterListItem>[] = [
    {
      title: t('Configuration Name'),
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: t('Configuration Parameters'),
      search: false,
      children: [
        {
          title: t('BSM'),
          dataIndex: 'bsmConfig',
          render: (bsmConfig) => <ParameterInfo infoMap={bsmMap} info={bsmConfig!} />,
        },
        {
          title: t('RSI'),
          dataIndex: 'rsiConfig',
          render: (rsiConfig) => <ParameterInfo infoMap={rsiMap} info={rsiConfig!} />,
        },
        {
          title: t('RSM'),
          dataIndex: 'rsmConfig',
          render: (rsmConfig) => <ParameterInfo infoMap={spatMap} info={rsmConfig!} />,
        },
        {
          title: t('MAP'),
          dataIndex: 'mapConfig',
          render: (mapConfig) => <ParameterInfo infoMap={spatMap} info={mapConfig!} />,
        },
        {
          title: t('SPAT'),
          dataIndex: 'spatConfig',
          render: (spatConfig) => <ParameterInfo infoMap={spatMap} info={spatConfig!} />,
        },
      ],
    },
    {
      title: t('Operate'),
      width: 200,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <CreateRSUConfigModal
          key="edit"
          editId={row.id}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <a key="details" onClick={() => history.push(`/maintenance/business/details/${row.id}`)}>
          {t('Details')}
        </a>,
        <Divider key="details-divider" type="vertical" />,
        <a
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this configuration?'),
              modalFn: deleteParameterConfig,
              actionRef,
            })
          }
        >
          {t('Delete')}
        </a>,
      ],
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable
        bordered
        columns={columns}
        actionRef={actionRef}
        request={parameterConfigList}
        pagination={{ pageSize: 5 }}
        toolBarRender={() => [
          <CreateRSUConfigModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default ConfigList;

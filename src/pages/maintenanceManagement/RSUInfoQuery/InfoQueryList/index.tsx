import React, { useRef } from 'react';
import { history } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import { QueryIntervalOptions, QueryTypeOptions } from '@/utils/constants';
import { infoQueryList } from '@/services/config/query';
import CreateQueryModal from './components/CreateQueryModal';
import { statusOptionFormat } from '@/utils';

const InfoQueryList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Config.QueryListItem>[] = [
    {
      title: t('Query RSU'),
      dataIndex: 'rsus',
      render: (_, { rsus }) => rsus.map(({ rsuName }) => rsuName).join('、'),
    },
    {
      title: t('Query Information Type'),
      dataIndex: 'queryType',
      valueType: 'select',
      valueEnum: statusOptionFormat(QueryTypeOptions),
      search: false,
    },
    {
      title: t('Query Information Time Interval'),
      dataIndex: 'timeType',
      valueType: 'select',
      valueEnum: statusOptionFormat(QueryIntervalOptions),
      search: false,
    },
    {
      title: t('Command Issue Time'),
      dataIndex: 'createTime',
      search: false,
    },
  ];
  const optionColumn: ProColumns[] = [
    {
      title: t('Operate'),
      width: 160,
      fixed: 'right',
      valueType: 'option',
      render: (_, { id, queryType }) => [
        <a
          key="details"
          onClick={() =>
            history.push({
              pathname: `/maintenance/query/details/${id}`,
              query: { type: queryType },
            })
          }
        >
          {t('Details')}
        </a>,
      ],
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable
        columns={[...columns, ...optionColumn]}
        actionRef={actionRef}
        request={infoQueryList}
        toolBarRender={() => [
          <CreateQueryModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default InfoQueryList;

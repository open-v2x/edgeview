import React from 'react';
import { history, useRequest } from 'umi';
import ProCard from '@ant-design/pro-card';
import BaseContainer from '@/components/BaseContainer';
import BaseProTable from '@/components/BaseProTable';
import type { ProColumns } from '@ant-design/pro-table';
import { infoQueryDetails } from '@/services/config/query';
import { NetworkStatusOptions, PowerStatusOptions, RunStatusOptions } from '@/utils/constants';
import { statusOptionFormat } from '@/utils';

const OperatingStatus: React.FC<{ data?: Config.QueryInfoDetails[] }> = ({ data = [] }) => {
  const dataSource = data.map(({ data: d, ...item }) => ({ ...item, ...d }));
  const columns: ProColumns<Config.QueryInfoDetails>[] = [
    {
      title: t('Device ID'),
      dataIndex: 'rsuId',
    },
    {
      title: t('Device Name'),
      dataIndex: 'rsuName',
    },
    {
      title: t('Serial Number'),
      dataIndex: 'rsuEsn',
    },
    {
      title: t('CPU Running Information'),
      children: [
        {
          title: t('CPU Load'),
          dataIndex: ['cpu', 'load'],
        },
        {
          title: t('CPU Utilization'),
          dataIndex: ['cpu', 'uti'],
        },
      ],
    },
    {
      title: t('Memory Operation Information'),
      children: [
        {
          title: t('Total Memory (M)'),
          dataIndex: ['mem', 'total'],
        },
        {
          title: t('Stored Memory (M)'),
          dataIndex: ['mem', 'used'],
        },
        {
          title: t('Available Memory (M)'),
          dataIndex: ['mem', 'free'],
        },
      ],
    },
    {
      title: t('Disk Operation Information'),
      children: [
        {
          title: t('Total Disk (M)'),
          dataIndex: ['disk', 'total'],
        },
        {
          title: t('Used Disk (M)'),
          dataIndex: ['disk', 'used'],
        },
        {
          title: t('Free Disk (M)'),
          dataIndex: ['disk', 'free'],
        },
        {
          title: t('IO Requests Per Second'),
          dataIndex: ['disk', 'tps'],
        },
        {
          title: t('Disk Data Written Per Second (K)'),
          dataIndex: ['disk', 'write'],
        },
        {
          title: t('Disk Data Read Per Second (K)'),
          dataIndex: ['disk', 'read'],
        },
      ],
    },
    {
      title: t('Network Operation Information'),
      children: [
        {
          title: t('Received Packets Per Second'),
          dataIndex: ['net', 'rx'],
        },
        {
          title: t('Send Packets Per Second'),
          dataIndex: ['net', 'tx'],
        },
        {
          title: t('Bytes Received Per Second'),
          dataIndex: ['net', 'rxByte'],
        },
        {
          title: t('Bytes Sent Per Second'),
          dataIndex: ['net', 'txByte'],
        },
      ],
    },
  ];
  return (
    <BaseProTable
      bordered
      columns={columns}
      dataSource={dataSource}
      rowKey="rsuId"
      search={false}
      scroll={{ x: 800 }}
      toolBarRender={false}
    />
  );
};

const DataStatistics: React.FC<{ data?: Config.QueryInfoDetails[] }> = ({ data = [] }) => {
  const dataSource = data.map(({ data: d, ...item }) => ({ ...item, ...d }));
  const columns: ProColumns<Config.QueryInfoDetails>[] = [
    {
      title: t('Device ID'),
      dataIndex: 'rsuId',
    },
    {
      title: t('Device Name'),
      dataIndex: 'rsuName',
    },
    {
      title: t('Serial Number'),
      dataIndex: 'rsuEsn',
    },
    {
      title: t('The Total Amount Of RSI Messages Reported'),
      dataIndex: 'RSI',
    },
    {
      title: t('The Total Amount Of MAP Messages Reported'),
      dataIndex: 'MAP',
    },
    {
      title: t('The Total Amount Of RSM Messages Reported'),
      dataIndex: 'RSM',
    },
    {
      title: t('The Total Amount Of SPAT Messages Reported'),
      dataIndex: 'SPAT',
    },
    {
      title: t('The Total Amount Of BSM Messages Reported'),
      dataIndex: 'BSM',
    },
  ];
  return (
    <BaseProTable
      columns={columns}
      dataSource={dataSource}
      rowKey="rsuId"
      search={false}
      toolBarRender={false}
    />
  );
};

const DeviceInfo: React.FC<{ data?: Config.QueryInfoDetails[] }> = ({ data = [] }) => {
  const deviceId = [
    {
      title: t('Device ID'),
      dataIndex: 'rsuId',
    },
    {
      title: t('Device Name'),
      dataIndex: 'rsuName',
    },
    {
      title: t('Serial Number'),
      dataIndex: 'rsuEsn',
    },
  ];
  const columns: ProColumns<Config.QueryInfoDetails>[] = [
    {
      title: t('Power State'),
      dataIndex: 'powerStatus',
      valueType: 'select',
      valueEnum: statusOptionFormat(PowerStatusOptions),
    },
    {
      title: t('Operating Status'),
      dataIndex: 'runStatus',
      valueType: 'select',
      valueEnum: statusOptionFormat(RunStatusOptions),
    },
    {
      title: t('Connection Status'),
      dataIndex: 'networkStatus',
      valueType: 'select',
      valueEnum: statusOptionFormat(NetworkStatusOptions),
    },
  ];
  const SubDeviceTable: React.FC<{ data: Config.QueryDeviceDetails[] }> = ({ data: list = [] }) => {
    const dataSource = list.map(({ Status: d, ...item }) => ({ ...item, ...d[0] }));
    const deviceType = [
      {
        title: t('Device ID'),
        dataIndex: 'deviceId',
      },
      {
        title: t('Device type'),
        dataIndex: 'deviceType',
      },
    ];
    return (
      <BaseProTable
        columns={[...deviceType, ...columns]}
        dataSource={dataSource}
        rowKey="deviceId"
        search={false}
        options={false}
        pagination={false}
      />
    );
  };
  return (
    <BaseProTable
      columns={[...deviceId, ...columns]}
      dataSource={data}
      search={false}
      toolBarRender={false}
      rowKey="rsuId"
      expandable={{ expandedRowRender: SubDeviceTable }}
    />
  );
};

const InfoQueryDetails: React.FC<RouterMatchTypes> = ({
  location: { query },
  match: { params },
}) => {
  if (!params.id) {
    history.goBack();
  }

  const { data } = useRequest(
    () => {
      return infoQueryDetails(+params.id);
    },
    { formatResult: (res) => res },
  );

  return (
    <BaseContainer back>
      <ProCard title={t('Basic Information')}>
        {query.type == '0' && <OperatingStatus data={data?.data} />}
        {query.type == '1' && <DataStatistics data={data?.data} />}
        {query.type == '2' && <DeviceInfo data={data?.data} />}
      </ProCard>
    </BaseContainer>
  );
};

export default InfoQueryDetails;

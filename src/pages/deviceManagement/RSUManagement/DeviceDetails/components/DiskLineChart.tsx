import React from 'react';
import { Line } from '@ant-design/charts';

const DiskLineChart: React.FC<{ list: Device.DiskRunningInfo[] }> = ({ list }) => {
  const data: { time: string; value: number; category: string }[] = [];
  list.map(({ time, rxByte, wxByte }) => {
    const date = new Date(+time);
    const timeString = `${date.getHours()}:${date.getMinutes()}`;
    data.push(
      { time: timeString, value: rxByte, category: t('Disk Data Read Per Second (K)') },
      { time: timeString, value: wxByte, category: t('Disk Data Written Per Second (K)') },
    );
  });
  const config: any = {
    data,
    xField: 'time',
    yField: 'value',
    seriesField: 'category',
  };
  return <Line {...config} />;
};

export default DiskLineChart;

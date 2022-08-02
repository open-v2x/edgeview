import React from 'react';
import { Line } from '@ant-design/charts';

const NetworkLineChart: React.FC<{ list: Device.NetRunningInfo[] }> = ({ list }) => {
  const data: { time: string; value: number; category: string }[] = [];
  list.map(({ time, read, write }) => {
    const date = new Date(+time);
    const timeString = `${date.getHours()}:${date.getMinutes()}`;
    data.push(
      { time: timeString, value: read, category: t('Disk Data Read Per Second (K)') },
      { time: timeString, value: write, category: t('Disk Data Written Per Second (K)') },
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

export default NetworkLineChart;

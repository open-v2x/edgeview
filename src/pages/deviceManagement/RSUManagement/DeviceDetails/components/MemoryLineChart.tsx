import React from 'react';
import { Line } from '@ant-design/charts';

const MemoryLineChart: React.FC<{ list: Device.MemRunningInfo[] }> = ({ list }) => {
  const data: { time: string; value: number; category: string }[] = [];
  list.map(({ time, total, used }) => {
    const date = new Date(+time);
    const timeString = `${date.getHours()}:${date.getMinutes()}`;
    data.push(
      { time: timeString, value: total, category: t('Total Memory (M)') },
      { time: timeString, value: used, category: t('Stored Memory (M)') },
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

export default MemoryLineChart;

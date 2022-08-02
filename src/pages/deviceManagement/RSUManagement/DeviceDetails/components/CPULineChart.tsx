import React from 'react';
import { Line } from '@ant-design/charts';

const CPULineChart: React.FC<{ list: Device.CPURunningInfo[] }> = ({ list }) => {
  const config: any = {
    data: list.map(({ time, load, uti }) => {
      const date = new Date(+time);
      const timeString = `${date.getHours()}:${date.getMinutes()}`;
      return { time: timeString, uti, value: load, category: t('CPU Load') };
    }),
    xField: 'time',
    yField: 'value',
    seriesField: 'category',
    color: ['#5b8ff9'],
  };
  return (
    <>
      <div className="cpu-core">
        {t('CPU Core Count')}：{list[0]?.uti || 0}
      </div>
      <Line {...config} />
    </>
  );
};

export default CPULineChart;

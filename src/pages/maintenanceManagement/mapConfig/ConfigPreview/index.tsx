import React from 'react';
import { history, useRequest } from 'umi';
import ProCard from '@ant-design/pro-card';
import { Stage, Layer, Rect, Line, Group } from 'react-konva';
import BaseContainer from 'edge-src/components/BaseContainer';

import styles from './index.less';
import { downloadMapConfig } from 'edge-src/services/config/map';

const canvasWidth = window.innerWidth - 256 - 40;
const canvasHeight = window.innerHeight - 52 - 72 - 40;
const halfWidth = canvasWidth / 2;
const halfHeight = canvasHeight / 2;

type LineMapProps = {
  laneWidth: number;
  laneNumber: number;
  horizontal: boolean;
};
type LaneMapProps = {
  laneWidths: number[];
  laneNumbers: number[];
  stroke: string;
};

const LaneLayer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layer x={halfWidth} y={halfHeight} offset={{ x: halfWidth, y: halfHeight }}>
    {children}
  </Layer>
);

const LineMap: React.FC<LineMapProps> = ({ laneNumber, laneWidth, horizontal }) => {
  const line = (type: string, length: number, coefficient = 1) =>
    Array.from({ length }, (_, index) => ({
      key: type + index,
      dash: [20, 20],
      offsetX: horizontal ? 0 : laneWidth * (index + 1) * coefficient,
      offsetY: horizontal ? laneWidth * (index + 1) * coefficient : 0,
    }));
  const lineMap = [
    { key: 'mid', dash: [], offsetX: 0 },
    ...line('left', laneNumber - 1),
    ...line('right', laneNumber - 1, -1),
  ];
  return (
    <>
      {lineMap.map(({ key, ...item }) => (
        <Line
          key={key}
          points={horizontal ? [0, 0, halfWidth, 0] : [0, 0, 0, halfHeight]}
          stroke="#566B85"
          strokeWidth={2}
          {...item}
        />
      ))}
    </>
  );
};

const RectMap: React.FC<any> = (props) => <Rect {...props} />;

const LaneMap: React.FC<LaneMapProps> = ({ laneNumbers, laneWidths, stroke }) => {
  const strokeWidth = 2;
  const rectProps = (index: number, type: boolean = false) => {
    const width = laneNumbers[index] * laneWidths[index];
    return {
      x: type ? -width : -strokeWidth,
      y: type ? -strokeWidth : -width,
      width: type ? width * 2 : halfWidth + strokeWidth,
      height: type ? halfHeight + strokeWidth : width * 2,
      fill: '#2C364E',
      stroke: stroke,
      strokeWidth,
    };
  };
  const lineProps = (index: number) => {
    return { laneNumber: laneNumbers[index], laneWidth: laneWidths[index] };
  };
  const groupMap = [
    {
      key: 'top',
      x: halfWidth,
      y: 0,
      rect: rectProps(0, true),
      line: { horizontal: false, ...lineProps(0) },
    },
    {
      key: 'bottom',
      x: halfWidth,
      y: halfHeight,
      rect: rectProps(2, true),
      line: { horizontal: false, ...lineProps(2) },
    },
    {
      key: 'right',
      x: halfWidth,
      y: halfHeight,
      rect: rectProps(1),
      line: { horizontal: true, ...lineProps(1) },
    },
    {
      key: 'left',
      x: 0,
      y: halfHeight,
      rect: rectProps(3),
      line: { horizontal: true, ...lineProps(3) },
    },
  ];
  return (
    <LaneLayer>
      {groupMap.map(({ key, x, y, rect, line }) => (
        <Group key={key} x={x} y={y}>
          <RectMap {...rect} />
          <LineMap {...line} />
        </Group>
      ))}
      <RectMap
        x={halfWidth - laneWidths[0] * laneNumbers[0] + 1}
        y={halfHeight - laneWidths[1] * laneNumbers[1] - 2}
        width={laneWidths[0] * laneNumbers[0] * 2 - 2}
        height={laneWidths[1] * laneNumbers[1] * 2 + 4}
        fill="#2C364E"
      />
    </LaneLayer>
  );
};

const ConfigPreview: React.FC<RouterMatchTypes> = ({ match: { params } }) => {
  if (!params.id) {
    history.goBack();
  }

  const { data } = useRequest(() => downloadMapConfig(+params.id), { formatResult: (res) => res });

  const laneNumbers: number[] = [];
  const laneWidths: number[] = [];
  data?.inLinks?.map(({ linkWidth, lanes }: { linkWidth: number; lanes: [] }) => {
    const multiple = 10;
    laneNumbers.push(lanes.length);
    laneWidths.push(Math.floor(Number(linkWidth) / lanes.length / multiple));
  });
  if (laneWidths[0] != laneWidths[2]) {
    laneWidths[2] = laneWidths[0];
  }
  if (laneWidths[1] != laneWidths[3]) {
    laneWidths[3] = laneWidths[1];
  }
  const stroke = '#8FCCF2';

  return (
    <BaseContainer back>
      <ProCard className={styles.preview}>
        <Stage width={canvasWidth} height={canvasHeight}>
          <LaneMap laneNumbers={laneNumbers} laneWidths={laneWidths} stroke={stroke} />
        </Stage>
      </ProCard>
    </BaseContainer>
  );
};

export default ConfigPreview;

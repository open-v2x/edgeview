import React from 'react';
import ProCard from '@ant-design/pro-card';
import CardList from '../CardList';
import { ICWCollisionTypeOptions } from '@/utils/constants';
import { dataFormat } from '@/utils';
import LonLatUnit from '../LonLatUnit';

type CollisionWarningDetailsProps = {
  type: 'ICW' | 'VRUCW';
  data: Event.ICWListItem;
};

const BasicInfo: React.FC<{ basicInfo: Event.ICWListItem | undefined }> = ({ basicInfo = {} }) => {
  const infoMap = [
    {
      key: 'id',
      label: t('ID'),
    },
    {
      key: 'lon',
      label: t('Sensor Longitude'),
      render: ({ sensorPos: { lon } }: Event.ICWListItem) => <LonLatUnit data={lon} />,
    },
    {
      key: 'lat',
      label: t('Sensor Latitude'),
      render: ({ sensorPos: { lat } }: Event.ICWListItem) => <LonLatUnit data={lat} />,
    },
    {
      key: 'collisionType',
      label: t('Collision Type'),
      render: ({ collisionType }: Event.ICWListItem) => ICWCollisionTypeOptions[collisionType],
    },
    { key: 'secMark', label: t('Millisecond Time') },
  ];
  return (
    <ProCard title={t('Basic Information')}>
      <CardList infoMap={infoMap} info={basicInfo} xl={12} />
    </ProCard>
  );
};

const CarInfo: React.FC<{ info: Event.ICWListItem | undefined }> = ({ info = {} }) => {
  const infoMap = [
    {
      key: 'egoId',
      label: t('ID'),
    },
    {
      key: 'lon',
      label: t('Longitude'),
      render: ({ egoPos: { lon } }: Event.ICWListItem) => <LonLatUnit data={lon} />,
    },
    {
      key: 'lat',
      label: t('Latitude'),
      render: ({ egoPos: { lat } }: Event.ICWListItem) => <LonLatUnit data={lat} />,
    },
    {
      key: 'egoHeading',
      label: t('Direction Angle'),
      render: ({ egoHeading }: Event.ICWListItem) => dataFormat(egoHeading * 0.0125, '°'),
    },
    {
      key: 'egoWidth',
      label: t('Vehicle Width'),
      render: ({ egoWidth }: Event.ICWListItem) => dataFormat(egoWidth * 0.01, 'm'),
    },
    {
      key: 'egoLength',
      label: t('Vehicle Length'),
      render: ({ egoLength }: Event.ICWListItem) => dataFormat(egoLength * 0.01, 'm'),
    },
    {
      key: 'speed',
      label: t('Speed'),
      render: ({ egoKinematicsInfo: { speed } }: Event.ICWListItem) =>
        dataFormat(speed * 0.02 * 3.6, 'km/h'),
    },
    {
      key: 'accelerate',
      label: t('Acceleration'),
      render: ({ egoKinematicsInfo: { accelerate } }: Event.ICWListItem) => (
        <>
          {dataFormat(accelerate * 0.02)}
          <span style={{ marginLeft: '6px' }}>
            m/s<sup>2</sup>
          </span>
        </>
      ),
    },
    {
      key: 'angularSpeed',
      label: t('Angular Velocity'),
      render: ({ egoKinematicsInfo: { angularSpeed } }: Event.ICWListItem) =>
        dataFormat(angularSpeed * 0.02, 'rad/s'),
    },
  ];
  return (
    <ProCard title={t('Car Information')}>
      <CardList infoMap={infoMap} info={info} xl={12} />
    </ProCard>
  );
};

const OtherCarInfo: React.FC<{ type: 'ICW' | 'VRUCW'; info: Event.ICWListItem | undefined }> = ({
  type,
  info = {},
}) => {
  const infoMap = [
    {
      key: 'otherId',
      label: t('ID'),
    },
    {
      key: 'lon',
      label: t('Longitude'),
      render: ({ otherPos: { lon } }: Event.ICWListItem) => <LonLatUnit data={lon} />,
    },
    {
      key: 'lat',
      label: t('Latitude'),
      render: ({ otherPos: { lat } }: Event.ICWListItem) => <LonLatUnit data={lat} />,
    },
    {
      key: 'otherHeading',
      label: t('Direction Angle'),
      render: ({ otherHeading }: Event.ICWListItem) => dataFormat(otherHeading * 0.0125, '°'),
    },
    {
      key: 'otherWidth',
      label: t('Vehicle Width'),
      disabled: type === 'VRUCW',
      render: ({ otherWidth }: Event.ICWListItem) => dataFormat(otherWidth * 0.01, 'm'),
    },
    {
      key: 'otherLength',
      label: t('Vehicle Length'),
      disabled: type === 'VRUCW',
      render: ({ otherLength }: Event.ICWListItem) => dataFormat(otherLength * 0.01, 'm'),
    },
    {
      key: 'otherRadius',
      label: t('Radius'),
      disabled: type !== 'VRUCW',
      render: ({ otherRadius }: Event.ICWListItem) =>
        otherRadius ? dataFormat(otherRadius / 10, 'm') : '-',
    },
    {
      key: 'speed',
      label: t('Speed'),
      render: ({ otherKinematicsInfo: { speed } }: Event.ICWListItem) =>
        dataFormat(speed * 0.02 * 3.6, 'km/h'),
    },
    {
      key: 'accelerate',
      label: t('Acceleration'),
      render: ({ otherKinematicsInfo: { accelerate } }: Event.ICWListItem) => (
        <>
          {dataFormat(accelerate * 0.02)}
          <span style={{ marginLeft: '6px' }}>
            m/s<sup>2</sup>
          </span>
        </>
      ),
    },
    {
      key: 'angularSpeed',
      label: t('Angular Velocity'),
      render: ({ otherKinematicsInfo: { angularSpeed } }: Event.ICWListItem) =>
        dataFormat(angularSpeed * 0.02, 'rad/s'),
    },
  ];
  return (
    <ProCard title={type === 'ICW' ? t('Other Car Information') : t('Participant Information')}>
      <CardList infoMap={infoMap.filter((item) => !item.disabled)} info={info} xl={12} />
    </ProCard>
  );
};

const CollisionWarningDetails: React.FC<CollisionWarningDetailsProps> = ({ type, data }) => {
  return (
    <>
      <BasicInfo basicInfo={data} />
      <CarInfo info={data} />
      <OtherCarInfo type={type} info={data} />
    </>
  );
};

export default CollisionWarningDetails;

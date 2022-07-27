import React from 'react';
import ProCard from '@ant-design/pro-card';
import CardList from '../CardList';
import { ICWCollisionTypeOptions } from '@/utils/constants';

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
      render: ({ sensorPos: { lon } }: Event.ICWListItem) => lon,
    },
    {
      key: 'lat',
      label: t('Sensor Latitude'),
      render: ({ sensorPos: { lat } }: Event.ICWListItem) => lat,
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
      render: ({ egoPos: { lon } }: Event.ICWListItem) => lon,
    },
    {
      key: 'lat',
      label: t('Latitude'),
      render: ({ egoPos: { lat } }: Event.ICWListItem) => lat,
    },
    {
      key: 'egoHeading',
      label: t('Direction Angle'),
      render: ({ egoHeading }: Event.ICWListItem) => `${egoHeading} 度`,
    },
    {
      key: 'egoWidth',
      label: t('Vehicle Width'),
      render: ({ egoWidth }: Event.ICWListItem) => `${egoWidth} m`,
    },
    {
      key: 'egoLength',
      label: t('Vehicle Length'),
      render: ({ egoLength }: Event.ICWListItem) => `${egoLength} m`,
    },
    {
      key: 'speed',
      label: t('Speed'),
      render: ({ egoKinematicsInfo: { speed } }: Event.ICWListItem) => `${speed} m/s`,
    },
    {
      key: 'accelerate',
      label: t('Acceleration'),
      render: ({ egoKinematicsInfo: { accelerate } }: Event.ICWListItem) => (
        <>
          {accelerate} m/s<sub>2</sub>
        </>
      ),
    },
    {
      key: 'angularSpeed',
      label: t('Angular Velocity'),
      render: ({ egoKinematicsInfo: { angularSpeed } }: Event.ICWListItem) =>
        `${angularSpeed} rad/s`,
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
      render: ({ otherPos: { lon } }: Event.ICWListItem) => lon,
    },
    {
      key: 'lat',
      label: t('Latitude'),
      render: ({ otherPos: { lat } }: Event.ICWListItem) => lat,
    },
    {
      key: 'otherHeading',
      label: t('Direction Angle'),
      render: ({ otherHeading }: Event.ICWListItem) => `${otherHeading} 度`,
    },
    {
      key: 'otherWidth',
      label: t('Vehicle Width'),
      disabled: type === 'VRUCW',
      render: ({ otherWidth }: Event.ICWListItem) => `${otherWidth} m`,
    },
    {
      key: 'otherLength',
      label: t('Vehicle Length'),
      disabled: type === 'VRUCW',
      render: ({ otherLength }: Event.ICWListItem) => `${otherLength} m`,
    },
    {
      key: 'otherRadius',
      label: t('Radius'),
      disabled: type !== 'VRUCW',
    },
    {
      key: 'speed',
      label: t('Speed'),
      render: ({ otherKinematicsInfo: { speed } }: Event.ICWListItem) => `${speed} m/s`,
    },
    {
      key: 'accelerate',
      label: t('Acceleration'),
      render: ({ otherKinematicsInfo: { accelerate } }: Event.ICWListItem) => (
        <>
          {accelerate} m/s<sub>2</sub>
        </>
      ),
    },
    {
      key: 'angularSpeed',
      label: t('Angular Velocity'),
      render: ({ otherKinematicsInfo: { angularSpeed } }: Event.ICWListItem) =>
        `${angularSpeed} rad/s`,
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

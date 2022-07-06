import React from 'react';
import { Col, Row } from 'antd';
import classNames from 'classnames';

import styles from './index.less';

type BasicInfoType = {
  infoMap: InfoMapType[];
  info: Record<string, any>;
  md?: number;
  xl?: number;
};

const CardList: React.FC<BasicInfoType> = ({ infoMap, info, md = 12, xl = 8 }) => {
  return (
    <Row gutter={[16, 14]}>
      {infoMap.map(({ key, label, block, render }) => (
        <Col
          key={key}
          span={24}
          md={!block ? md : undefined}
          xl={!block ? xl : undefined}
          className={classNames(styles.list, 'f')}
        >
          <span>{label}：</span>
          {render?.(info) || info[key]}
        </Col>
      ))}
    </Row>
  );
};

export default CardList;

import React from 'react';
import { Space } from 'antd';

import styles from './index.less';

type OnlineStatusType = {
  status: boolean;
  statusName: React.ReactNode;
};

const OnlineStatus: React.FC<OnlineStatusType> = ({ status, statusName }) => {
  const color = status ? '#52C41A' : 'rgba(0, 0, 0, 0.25)';

  return (
    <Space>
      <span className={styles.dots} style={{ backgroundColor: color }} />
      {statusName}
    </Space>
  );
};

export default OnlineStatus;

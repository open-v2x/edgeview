import React from 'react';
import { Tabs } from 'antd';
import BaseContainer from '@/components/BaseContainer';
import RegisteredList from './components/RegisteredList';
import NotRegisteredList from './components/NotRegisteredList';

import styles from './index.less';

const DeviceList: React.FC = () => {
  return (
    <BaseContainer>
      <Tabs className={styles.rsu_tabs} destroyInactiveTabPane>
        <Tabs.TabPane tab={t('RSU Device')} key="1">
          <RegisteredList />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('Unregistered RSU')} key="2">
          <NotRegisteredList />
        </Tabs.TabPane>
      </Tabs>
    </BaseContainer>
  );
};

export default DeviceList;

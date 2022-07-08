import React from 'react';
import BaseContainer from '@/components/BaseContainer';
import ProCard from '@ant-design/pro-card';
import classNames from 'classnames';
import UpdateSiteNameModal from './components/UpdateSiteNameModal';

import styles from './index.less';
import UpdateSiteConfigModal from './components/UpdateSiteConfigModal';

const EdgeSiteConfig: React.FC = () => {
  return (
    <BaseContainer>
      <ProCard className={styles.edge_site}>
        <div className={classNames('f f-a-center', styles.site)}>
          <img className={styles.site_icon} src="/assets/images/site_name.png" alt="" />
          <div className={styles.site_info}>
            <div className={styles.site_info_name}>{t('Edge site name')}</div>
            <div className={styles.site_info_desc}>
              {t('Current name')}：{0 ? <span>{'**名称'}</span> : t('Unnamed')}
            </div>
          </div>
          <UpdateSiteNameModal name={''} success={() => {}} />
        </div>
        <div className={classNames('f f-a-center', styles.site)}>
          <img className={styles.site_icon} src="/assets/images/site_config.png" alt="" />
          <div className={styles.site_info}>
            <div className={styles.site_info_name}>
              {t('Cloud control center connection configuration')}
            </div>
            <div className={styles.site_info_desc}>
              {0 ? <span>Host：{'139.196.13.9'}</span> : t('Connection configuration tips')}
            </div>
          </div>
          <UpdateSiteConfigModal info={undefined} success={() => {}} />
        </div>
      </ProCard>
    </BaseContainer>
  );
};

export default EdgeSiteConfig;

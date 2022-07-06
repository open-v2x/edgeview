import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { history } from 'umi';

type BaseContainerType = {
  children: React.ReactNode;
  back?: boolean;
};

const BaseContainer: React.FC<BaseContainerType> = ({ children, back = false }) => {
  return (
    <PageContainer
      header={{ breadcrumb: undefined }}
      extra={
        back
          ? [
              <Button key="back" onClick={() => history.goBack()}>
                {t('Back')}
              </Button>,
            ]
          : []
      }
    >
      {children}
    </PageContainer>
  );
};

export default BaseContainer;

import React from 'react';
import { history, useModel } from 'umi';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { login } from '@/services/api';
import classNames from 'classnames';
import { setToken } from '@/utils/storage';
import { SelectLang } from '@/components/SelectLang';

import styles from './index.less';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    const { access_token: accessToken, token_type: tokenType } = await login(values);
    const token = `${tokenType} ${accessToken}`;
    // const { data } = await login({ methods: ['password'], password: values });
    // const { data: token } = await tokens({ methods: ['token'], token: data });
    setToken(token);
    await fetchUserInfo();
    /** 此方法会跳转到 redirect 参数所在的位置 */
    if (!history) return;
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.replace(redirect || '/');
  };

  return (
    <div className={classNames(styles.container, 'f f-j-end f-a-center')}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <LoginForm
        logo={<>{t('OpenV2X Edge Portal')}</>}
        onFinish={async (values) => {
          await handleSubmit(values as API.LoginParams);
        }}
      >
        <p>{t('Platform Login')}</p>
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <img src="/assets/images/login_user.png" />,
          }}
          placeholder={t('Username')}
          rules={[{ required: true, message: t('Please input your username') }]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <img src="/assets/images/login_password.png" />,
          }}
          placeholder={t('Password')}
          rules={[{ required: true, message: t('Please input your password') }]}
        />
      </LoginForm>
    </div>
  );
};

export default Login;

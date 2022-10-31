import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading, ProBreadcrumb } from '@ant-design/pro-layout';
import { history } from 'umi';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import RightContent from 'edge-src/components/RightContent';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/api';
import i18n from './utils/i18n';
import { getToken } from './utils/storage';

window.t = i18n.t;

const loginPath = '/user/login';

export const request: RequestConfig = {
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.code === 0,
        errorMessage: resData.msg,
      };
    },
  },
};

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const data = await queryCurrentUser();
      return { username: data?.username };
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面且未登录，不执行
  const { pathname } = history.location;
  if (!pathname.startsWith(loginPath) && getToken()) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    disableContentMargin: false,
    menuHeaderRender: () => <h1>{t('OpenV2X Edge Portal')}</h1>,
    rightContentRender: () => <RightContent />,
    headerContentRender: () => {
      return <ProBreadcrumb />;
    },
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    ...initialState?.settings,
  };
};

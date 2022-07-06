import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  title: 'V2X 路侧设备管理平台',
  headerHeight: 52,
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  navTheme: 'dark',
  fixedHeader: true,
  fixSiderbar: true,
  splitMenus: false,
  pwa: false,
  colorWeak: false,
  iconfontUrl: '/assets/font/iconfont.js',
};

export default Settings;

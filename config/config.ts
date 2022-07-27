import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: { hmr: true },
  layout: {
    locale: true,
    siderWidth: 300,
    ...defaultSettings,
  },
  locale: {
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: { ie: 11 },
  routes,
  theme: {
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  define: {
    'process.env.API_SERVER': 'APISERVER',
    'process.env.AMAP_KEY': 'AMAPKEY',
  },
  manifest: { basePath: '/' },
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: { type: 'none' },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  extraBabelPlugins: [
    [
      'istanbul',
      {
        useInlineSourceMaps: false,
      },
    ],
  ],
});

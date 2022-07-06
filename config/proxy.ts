/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api': {
      target: 'http://106.15.193.98:28300/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  // test: {
  //   '/api/': {
  //     target: '',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  // },
  // pre: {
  //   '/api/': {
  //     target: '',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  // },
};

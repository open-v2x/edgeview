# 快速开始

## 环境准备

- OpenV2X 边缘云控平台 (edgeview) 开发需要准备后端环境。环境准备可以使用 OpenV2X All-in-One
  [快速安装](https://github.com/open-v2x/docs/blob/master/src/v2x-quick-install.md)

- 环境准备完成后，即可登录边缘云控平台进行设备配置，具体配置参考
  [v2x-quick-start](https://github.com/open-v2x/docs/blob/master/src/v2x-quick-start.md#4-edgeportal-%E5%92%8C-centralportal-%E7%9A%84%E5%BF%AB%E9%80%9F%E8%81%94%E5%8A%A8)

## 依赖准备

- node 环境

  - package.json 中要求：`"node": ">=14.17.0"`
  - 验证 nodejs 版本，请确认 nodejs 版本符合要求

    ```shell
    node -v
    ```
    > 推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理 node 版本

- yarn

  - 安装 yarn

    ```shell
    npm install -g yarn
    ```

- 安装依赖包

  - 在项目根目录下执行，即`package.json`同级，需要耐心等待安装完成

    ```shell
    yarn install
    ```

> 如果下载出现意外请设置国内镜像

> `npm config set registry http://registry.npmmirror.com`

> 或者

> `yarn config set registry http://registry.npmmirror.com`

- 准备好可用的后端

  - 准备好可访问的后端，举个例子：<http://47.100.126.13>
  - 修改`config/proxy.ts`中的相应配置：

    ```javascript
    dev: {
      '/api': {
        target: 'http://47.100.126.13:8080/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    ```

- 搭建完成

  - 在项目根目录下执行，即`package.json`同级

    ```shell
    yarn start
    ```

  - 然后会自动启动浏览器打开：`http://localhost:8000`，即可查看到平台页面。

## 生产环境使用的前端包

- 具备符合要求的`nodejs`与`yarn`
- 在项目根目录下执行，即`package.json`同级

  ```shell
  yarn build
  ```

- 打包后的文件在`dist`目录，交给部署相关人员即可。

## 如何构建镜像

```js
docker build -t openv2x/edgeview:latest .
```

## 如何启用镜像

```js
docker run -d -p <映射端口>:80 -e API_SERVER='http://<dandelion所在环境ip>/api' -e MAP_KEY=<高德地图key> -v <绝对路径>/deploy/edgeview.conf:/etc/nginx/conf.d/default.conf -v <绝对路径>/deploy/nginx.conf:/etc/nginx/nginx.conf --name=edgeview openv2x/edgeview:latest
```

## 如何贡献代码

参考 [v2x_contribution](https://github.com/open-v2x/docs/blob/master/src/v2x_contribution-zh_CN.md) 提交
PR 贡献代码。

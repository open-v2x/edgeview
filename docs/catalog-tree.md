# 目录介绍

```js
├── dist                                // 默认的 build 输出目录
├── config                              // 全局配置文件
│   ├── config.dev.ts                   // 开发环境配置
│   ├── config.ts                       // 生产环境配置
│   ├── defaultSettings.ts              // 项目默认 layout 配置
│   ├── proxy.ts                        // 开发环境后端 server 配置
│   ├── routes.ts                       // 项目路由配置
├── deploy                              // 部署相关配置文件
├── docs                                // 文档
├── mock                                // mock 数据
├── public                              // 公共的文件（如 image、favicon 等）
├── src                                 // 源码目录
│   ├── components                      // 公共组件
│   ├── locales                         // 国际化文件
│   ├── pages                           // 页面模块
│   ├── services                        // api
│   ├── utils                           // 工具类
│   ├── access.ts                       // access
│   ├── app.tsx                         // 入口文件
│   ├── global.less                     // 全局样式
│   ├── manafest.json                   // 应用元数据
│   ├── service-worker.js               // service-worker
│   ├── typings.d.ts                    // ts 类型声明
├── tests                               // 源码目录
├── .editorconfig                       // IDE格式规范
├── .eslintignore                       // eslint忽略
├── .eslintrc                           // eslint配置文件
├── .gitignore                          // git忽略
├── .prettierignore                     // prettierc忽略
├── .prettierrc                         // prettierc配置文件
├── .stylelintignore                    // stylelint忽略
├── .stylelintrc                        // stylelint配置文件
├── Dockerfile                          // stylelint配置文件
├── dprint.json                         // github action 代码规范检测
├── Gruntfile.js                        // grunt 配置文件，用于扫描生产国际化文件
├── jest.config.js                      // 单元测试配置文件
├── jsconfig.json                       // javascript 辅助配置文件
├── LICENSE                             // license
├── package.json                        // package
├── playwright.config.ts                // e2e 测试配置文件
├── README.md                           // README
├── tsconfig.json                       // typescript 配置文件
```

## 文件命名规范

### 文件命名

- 属于 components 文件夹下的子文件夹，使用大写字母开头的 PascalBase 风格
- 如果是组件文件，则使用 PascalCase，如 MyComponent.ts
- 如果该文件夹内是一个组件，则组件主入口命名为 index，需要有 index.ts,该文件夹命名使用 PascalCase。如：

```js
src / components / Button / index.ts;
```

```js
-[src] -
  [pages] -
  [layout] -
  [components] -
  [Sidebar] -
  index.ts -
  Item.ts -
  SidebarItem.ts -
  AppMain.ts -
  index.ts -
  Navbar.ts;
```

- 其他情况文件夹使用 CamelCase， 单复数视情况

### 图片命名

1. 图片名称必须小写，禁止使用特殊字符、中文
2. 使用英文或英文缩写，禁止特殊字符，禁止使用拼音
3. 名称间隔使用\_符号
4. 命名需要能体现图片的大概用途
5. 禁止文件名和实际图片内容不符
6. icon 命名禁止出现拼音

常用示例：

```js
bg.jpg; //背景图片
mod_bg.jpg; //模块背景
```

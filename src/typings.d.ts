declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design Dedicated environment variable, please do not use it in your project.
declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'site' | undefined;

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

type RouterMatchTypes = {
  location: {
    query: Record<string, string>;
    state: unknown;
  };
  match: {
    params: Record<string, string>;
  };
};

type InfoMapType = {
  key: string;
  label: string;
  block?: boolean;
  render?: (data: any) => void;
  span?: number;
  unit?: string;
};

type CreateModalProps = {
  editId?: number; // 编辑id
  editInfo?: { id: number } & Record<
    string,
    string | number | boolean | Record<string, string | number | boolean>[]
  >; // 编辑信息
  isDetails?: boolean; // 是否详情
  success: () => void; // 创建或编辑成功回调
};

declare function t(key: string, { [key as string]: string }?): string & React.ReactNode;

import type { ProColumnGroupType, SearchConfig } from '@ant-design/pro-table';

declare module '@ant-design/pro-table' {
  export declare type TableProColumns<T = any, ValueType = 'text'> = Omit<
    ProColumnGroupType<T, ValueType>,
    'search'
  > & {
    search?: boolean | SearchConfig;
  };
}

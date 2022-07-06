import ProTable from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { OptionConfig, ToolBarProps } from '@ant-design/pro-table/lib/components/ToolBar';
import type { TableProps } from 'antd';
import type { ExpandableConfig } from 'antd/lib/table/interface';

type BaseProTableType = {
  columns: ProColumns[];
  bordered?: boolean;
  actionRef?: React.Ref<ActionType | undefined> | undefined;
  dataSource?: any[];
  params?: Record<string, string | number>;
  request?: (params: any) => Promise<Partial<any>>;
  rowSelection?:
    | (TableProps<any>['rowSelection'] & {
        alwaysShowAlert?: boolean;
      })
    | false;
  rowKey?: string;
  search?: false | { labelWidth: number };
  pagination?: { pageSize: number } | false;
  scroll?: { x: number };
  headerTitle?: string | React.ReactNode;
  toolBarRender?: ToolBarProps<any>['toolBarRender'] | false;
  options?: false | OptionConfig;
  expandable?: ExpandableConfig<any>;
};

const BaseProTable: React.FC<BaseProTableType> = (props) => {
  const {
    bordered = false,
    columns,
    actionRef,
    dataSource,
    request,
    params,
    rowSelection,
    rowKey = 'id',
    search = { labelWidth: 0 },
    pagination = { pageSize: 10 },
    scroll,
    headerTitle,
    toolBarRender,
    options,
    expandable,
  } = props;

  return (
    <ProTable
      bordered={bordered}
      columns={columns}
      actionRef={actionRef}
      dataSource={dataSource}
      request={async (param) => {
        const res = await request?.(param);
        return { data: res?.data, success: true };
      }}
      params={params}
      rowSelection={rowSelection}
      rowKey={rowKey}
      search={search}
      pagination={pagination}
      scroll={scroll}
      headerTitle={headerTitle}
      toolBarRender={toolBarRender}
      options={options}
      expandable={expandable}
    />
  );
};

export default BaseProTable;

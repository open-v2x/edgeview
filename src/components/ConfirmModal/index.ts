import { message, Modal } from 'antd';
import type { ActionType } from '@ant-design/pro-table';

type confirmModalParams = {
  id: number;
  content: string; // modal 提示内容
  modalFn: (id: number, params?: any) => void;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  title?: string; // modal 标题
  successMsg?: string; // modal 操作成功的提示信息
  params?: number | Record<string, string | boolean | number>; // 额外参数
};
export const confirmModal = async ({
  id,
  params,
  title = t('Delete'),
  content,
  successMsg = t('{{value}} successfully', { value: t('Deleted') }),
  modalFn,
  actionRef,
}: confirmModalParams) => {
  Modal.confirm({
    title,
    content,
    onOk() {
      return new Promise(async (resolve) => {
        try {
          await modalFn(id, params);
          resolve(true);
          message.success(successMsg);
          actionRef.current?.reload?.();
        } catch {
          resolve(false);
        }
      });
    },
  });
};

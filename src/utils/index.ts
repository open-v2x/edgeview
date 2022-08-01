// 表格 select 选项格式化
export const statusOptionFormat = (
  data: Record<string, string> | string[],
): Record<string, { text: string }> => {
  const result = {};
  if (Array.isArray(data)) {
    data.map((value: string, index: number) => (result[index] = { text: value }));
  } else {
    Object.keys(data).map((key) => (result[key] = { text: data[key] }));
  }
  return result;
};

export const downloadFile = (url: string, name: string) => {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', name);
  document.body.appendChild(a);
  a.click();
  a.remove();
};

export const dataFormat = (data: number, unit?: string | React.ReactNode) => {
  if (data) {
    return `${Math.round(data * 100) / 100} ${unit || ''}`;
  }
  return '-';
};

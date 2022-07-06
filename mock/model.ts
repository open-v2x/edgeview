import { Request, Response } from 'express';
import { parse } from 'url';

const genList = (current: number, pageSize: number) => {
  const data: Device.ModelListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i + 1;
    data.push({
      id: index,
      modelName: `型号名称 ${index}`,
      manufacturer: `厂商名称 ${index}`,
      describe: '1234567890',
      createTime: '2022-03-14  23:12:00',
    });
  }
  data.reverse();
  return data;
};

let tableDataSource = genList(1, 40);

function getList(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    Device.ModelListItem & { filter: any };

  let dataSource = [...tableDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  if (params.modelName) {
    dataSource = dataSource.filter((data) => data?.modelName?.includes(params.modelName || ''));
  }

  const result = {
    data: dataSource,
    total: params.modelName ? dataSource.length : tableDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.pageNum}`, 10) || 1,
  };

  return res.json(result);
}

export default {
  'GET /api/model/list': getList,
};

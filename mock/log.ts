import { Request, Response } from 'express';

const genList = (pageNum: number, pageSize: number) => {
  const data: Config.LogListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (pageNum - 1) * 10 + i + 1;
    data.push({
      id: index,
      uploadUrl: 'http://172.16.1.167:8000',
      userId: `username ${index + 1}`,
      createTime: '2022-03-14 23:12:00',
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
  const { pageNum = 1, pageSize = 10 } = req.query;

  let dataSource = [...tableDataSource].slice(
    ((pageNum as number) - 1) * (pageSize as number),
    (pageNum as number) * (pageSize as number),
  );

  const result = {
    data: {
      data: dataSource,
      total: tableDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/log': getList,
};

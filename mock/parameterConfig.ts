import { Request, Response } from 'express';
import { parse } from 'url';

const genList = (current: number, pageSize: number) => {
  const data: Config.ParameterListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i + 1;
    data.push({
      id: index,
      templateName: `test模板${index}`,
      bsm: {
        samplingMethod: '全局采样',
        samplingRate: 12,
        upsideCap: 1200,
      },
      rsi: {
        amount: 200,
      },
      rsm: {
        upsideCap: 1200,
        downsideCap: 1200,
      },
      spat: {
        upsideCap: 1200,
        downsideCap: 1200,
      },
    });
  }
  data.reverse();
  return data;
};

let tableDataSource = genList(1, 20);

function getList(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    Config.ParameterListItem & { filter: any };

  let dataSource = [...tableDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  if (params.templateName) {
    dataSource = dataSource.filter((data) =>
      data?.templateName?.includes(params.templateName || ''),
    );
  }

  const result = {
    data: dataSource,
    total: params.templateName ? dataSource.length : tableDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.pageNum}`, 10) || 1,
  };

  return res.json(result);
}

export default {
  'GET /api/parameter/list': getList,
};

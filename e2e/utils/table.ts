import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
export const tableRow = (page: Page, rowIndex = 0) => {
  const tbody = page.locator('.ant-table-tbody');
  const row = tbody.locator('.ant-table-row').nth(rowIndex);
  return row;
};

export const tableNoData = async (page: Page) => {
  const rowCount = await page.locator('.ant-table-tbody .ant-table-row').count();
  return rowCount === 0;
};

// 校验表格至少存在 rowLength 条数据
export const checkTableRowLength = async (page: Page, rowLength = 10) => {
  await page.waitForSelector('.ant-table-row');
  const rows_length = (await page.$$('.ant-table-row')).length;
  expect(rows_length).toBeGreaterThanOrEqual(rowLength);
};

// 获取表格总的数据条数
export const getTableTotal = async (page: Page) => {
  await page.waitForTimeout(3000);
  // 有可能表格是空的，返回0
  const res_1 = await tableNoData(page);
  if (res_1) {
    return 0;
  } else {
    const res = await page.locator('.ant-pagination-total-text').textContent();
    return res?.split(' ')[4];
  }
};
// 获取表格第 row 行的第 clo 列数据
export const getTabelVal = async (page: Page, row: Number, clo: Number) => {
  const res = await page
    .locator(`.ant-table-tbody > tr:nth-child(${row}) > td:nth-child(${clo})`)
    .textContent();
  return res;
};
// 筛选框筛选后，判断表格的某个字段全部等于输入的 value 值
export const checkTableItemEqualValue = async (page: Page, value: string, index: Number) => {
  const rows = await getTableTotal(page);
  for (let i = 1; i <= Number(rows); i++) {
    const item_value = await getTabelVal(page, i, index);
    expect(item_value).toEqual(value);
  }
};

// 筛选框筛选后，判断表格的某个字段全部包含输入的 value 值
export const checkTableItemContainValue = async (page: Page, value: string, index: Number) => {
  const rows = await getTableTotal(page);
  for (let i = 1; i <= Number(rows); i++) {
    const item_value = await getTabelVal(page, i, index);
    expect(item_value).toContain(value);
  }
};
// 校验表格内容为空
export const checkEmptyTable = (page: Page) => {
  expect(page.locator('.ant-empty-normal')).toBeVisible();
};

export const tableOperationBtn = (page: Page, selecor: string) => {
  const row = tableRow(page);
  const btn = row.locator('.ant-table-cell-fix-right-first .ant-space-item').locator(selecor);
  return btn;
};

export const tableToolbarRight = (page: Page) => {
  return page.locator('.ant-pro-table-list-toolbar-right');
};

export const clickCreateBtn = async (page: Page, delay = 1000) => {
  const createBtn = tableToolbarRight(page).locator('#createButton');
  await createBtn.click({ delay });
};

export const clickEditBtn = async (page: Page, selecor: string = '#editButton', delay = 1000) => {
  await tableOperationBtn(page, selecor).click({ delay });
};

export const clickEnableDisableBtn = async (
  page: Page,
  selecor: string = '#enableDisableButton',
  delay = 1000,
) => {
  await tableOperationBtn(page, selecor).click({ delay });
};

export const clickDetailBtn = async (
  page: Page,
  selecor: string = '#detailButton',
  delay = 1000,
) => {
  await tableOperationBtn(page, selecor).click({ delay });
};

// 点击有id的button
export const clickIDBtn = async (page: Page, selecor: string, delay = 1000) => {
  await tableOperationBtn(page, selecor).click({ delay });
};

export const clickDetailTextBtn = async (
  page: Page,
  selecor: string = 'text="详情"',
  delay = 1000,
) => {
  await page.click(selecor, { delay });
};

export const clickDeleteTextBtn = async (
  page: Page,
  selecor: string = 'text="删除"',
  delay = 1000,
) => {
  await page.click(selecor, { delay });
};

export const clickEnableDisableTextBtn = async (
  page: Page,
  selecor: string = 'text="启用"',
  delay = 1000,
) => {
  await page.click(selecor, { delay });
};

export const clickDownTextBtn = async (
  page: Page,
  selecor: string = 'text="下发"',
  delay = 1000,
) => {
  await page.click(selecor, { delay });
};

export const clickDeleteBtn = async (
  page: Page,
  selecor: string = '#deleteButton',
  delay = 1000,
) => {
  await tableOperationBtn(page, selecor).click({ delay });
};

export const clickCopyBtn = async (page: Page, selecor: string = '#sendRSU', delay = 1000) => {
  await tableOperationBtn(page, selecor).click({ delay });
};

export const confirmModal = (page: Page) => {
  const modal = page.locator('.ant-modal-wrap .ant-modal-confirm');
  return modal;
};

export const clickConfirmModalOkBtn = async (page: Page) => {
  await confirmModal(page).locator('.ant-modal-confirm-btns #okButton').click();
};

export const clickConfirmModalCancelBtn = async (page: Page) => {
  await confirmModal(page).locator('.ant-modal-confirm-btns #cancelButton').click();
};

export const tableSearch = (page: Page) => {
  return page.locator('.ant-pro-table-search');
};

export const tableSearchItem = (page: Page, selecor: string) => {
  return tableSearch(page).locator(selecor);
};

export const setSearchItemValue = (page: Page, selecor: string, value: string) => {
  return tableSearchItem(page, selecor).fill(value);
};

export const clickQueryResetBtn = async (page: Page, delay = 1000) => {
  await tableSearch(page)
    .locator('.pro-form-query-filter-actions .ant-btn-default')
    .click({ delay });
};
export const clickQuerySearchBtn = async (page: Page, delay = 1000) => {
  await tableSearch(page)
    .locator('.pro-form-query-filter-actions .ant-btn-primary')
    .click({ delay });
  await page.waitForTimeout(500);
};
export const searchItemAndQuery = async (page: Page, selecor: string, value: string) => {
  await setSearchItemValue(page, selecor, value);
  await clickQuerySearchBtn(page);
};

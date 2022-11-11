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
  pageUrl: string,
  selecor: string = '#detailButton',
  delay = 1000,
) => {
  await tableOperationBtn(page, selecor).click({ delay });
  await expect(page).toHaveURL(new RegExp(`${pageUrl}/details`));
};

export const clickDeleteBtn = async (
  page: Page,
  selecor: string = '#deleteButton',
  delay = 1000,
) => {
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
};
export const searchItemAndQuery = async (page: Page, selecor: string, value: string) => {
  await setSearchItemValue(page, selecor, value);
  await clickQuerySearchBtn(page);
};

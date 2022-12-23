import type { Page } from '@playwright/test';
import { clickQuerySearchBtn } from './table';

export const formItemSelect = (page: Page, selector: string) => {
  return page.locator(`.antd-form-item-${selector}`).locator('.ant-select');
};

// 创建和编辑时选择的下拉框
export const setSelectValue = async (
  page: Page,
  selector: string,
  detail_selector: string,
  nthChild: number = 1,
) => {
  await formItemSelect(page, selector).click();
  await page
    .locator(`${detail_selector} + .rc-virtual-list`)
    .locator(`.rc-virtual-list-holder-inner > div:nth-child(${nthChild})`)
    .click();
};

// 查询时选择的下拉框
export const setQuerySelectValue = async (page: Page, selector: string, nthchild: number = 1) => {
  await page.click(selector);
  await page.locator(`.rc-virtual-list-holder-inner > div:nth-child(${nthchild})`).click();
  await clickQuerySearchBtn(page);
  await page.waitForTimeout(1000);
};

export const formItemCascader = (page: Page, selector: string) => {
  return page.locator(`.antd-form-item-${selector}`).locator('.ant-cascader');
};

export const setCascaderItemValue = async (page: Page, index: number = 0) => {
  await page
    .locator(`.ant-cascader-dropdown`)
    .locator('.ant-cascader-menu-item')
    .nth(index)
    .click();
};

// indexs: 级联菜单下标列表
export const setCascaderValue = async (page: Page, selector: string, indexs: number[]) => {
  await formItemCascader(page, selector).click();
  for (let i = 0; i < indexs.length; i++) {
    await setCascaderItemValue(page, indexs[i]);
  }
};

export const globalModal = (page: Page) => {
  const modal = page.locator('.ant-modal-wrap .ant-modal');
  return modal;
};

export const globalModalFormItem = (page: Page, selector: string) => {
  const item = globalModal(page).locator(selector);
  return item;
};

export const setModalFormItemValue = async (page: Page, selector: string, value: string) => {
  const item = globalModalFormItem(page, selector);
  await item.fill(value);
};

export const globalModalFormItems = (page: Page, selectors: string[]) => {
  const list: any = [];
  selectors.map((selector) => {
    const item = globalModalFormItem(page, selector);
    list.push(item);
  });
  return list;
};

export const globalModalSubmitBtn = async (page: Page) => {
  const footer = globalModal(page).locator('.ant-modal-footer');
  const btn = footer.locator('#submitButton');
  await btn.click();
};

export const globalModalCancelBtn = async (page: Page) => {
  const footer = globalModal(page).locator('.ant-modal-footer');
  const btn = footer.locator('#cancelButton');
  await btn.click();
};

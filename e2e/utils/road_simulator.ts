import { expect, Page } from '@playwright/test';
const clientId = 'R328328';
const password = 'password';
//   const rsu_simulator_Url = 'http://47.100.126.13:6688'

export const connectMqtt = async (page: Page) => {
  await page.fill('#clientId', clientId);
  await page.fill('#password', password);
  await page.click('#connectButton');
  const locator = page.locator('#state');
  await expect(locator).toHaveText('connected');
};
// 勾选复选框
export const checkDataset = async (page: Page, name: string) => {
  await page.click(`xpath=//td[contains(text(), "${name}")]/preceding-sibling::td[1]`);
};

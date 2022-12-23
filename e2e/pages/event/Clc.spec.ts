import { test } from '@playwright/test';
import config from '../../../playwright.config';
import { setQuerySelectValue } from '../../utils/form';
import { gotoPageAndExpectUrl, useUserStorageState } from '../../utils/global';
import { checkDataset, connectMqtt } from '../../utils/road_simulator';

import { checkEmptyTable, checkTableRowLength } from '../../utils/table';

test.describe('The Sds Page', () => {
  const pageUrl = '/event/clc';
  const baseURL = config.use?.baseURL;

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();
  test.beforeEach(async ({ page }) => {
    await gotoPageAndExpectUrl(page, pageUrl);
  });

  test('用路侧模拟器发送[协作换道]数据', async ({ page }) => {
    await page.goto(`${baseURL}:6688`);
    await connectMqtt(page);
    await checkDataset(page, 'CLC_track');
    await checkDataset(page, 'msg_VIR_CLC');
    // 直到loading结束再点击发送按钮
    await page.locator('#loading-CLC_track').waitFor({ state: 'hidden' });
    await page.click('#publishDataSetButton');
    await page.waitForTimeout(10000); // 发送10s数据后停止发送
    await page.click('#publishDataSetButton');
  });

  test('成功接收到数据', async ({ page }) => {
    page.reload();

    await checkTableRowLength(page, 3);
  });

  test('成功通过下拉框筛选数据', async ({ page }) => {
    page.goto(pageUrl);
    await setQuerySelectValue(page, '#info', 2);
    await checkEmptyTable(page);
  });
});

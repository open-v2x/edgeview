import { expect, test } from '@playwright/test';
import config from '../../../playwright.config';
import { setQuerySelectValue } from '../../utils/form';
import { gotoPageAndExpectUrl, useUserStorageState } from '../../utils/global';
import { checkDataset, connectMqtt } from '../../utils/road_simulator';
import { checkTableRowLength, getTableTotal } from '../../utils/table';

test.describe('The Sds Page', () => {
  const pageUrl = '/event/icw';
  const baseURL = config.use?.baseURL;

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();
  test.beforeEach(async ({ page }) => {
    await gotoPageAndExpectUrl(page, pageUrl);
  });

  test('用路侧模拟器发送[交叉路口碰撞预警]数据', async ({ page }) => {
    await page.goto(`${baseURL}:6688`);
    await connectMqtt(page);
    await checkDataset(page, 'ICW_track');
    await checkDataset(page, 'CLC_track'); //如果只发送交叉路口碰撞预警数据，下拉框筛选可能选不出数据或者数据总数不变。
    //所以要发送一些别的数据，使得下拉框筛选后数据总数减少以此验证下拉框筛选数据是有效的。
    await checkDataset(page, 'msg_VIR_CLC');

    // 直到loading结束再点击发送按钮
    await page.locator('#loading-ICW_track').waitFor({ state: 'hidden' });
    await page.locator('#loading-CLC_track').waitFor({ state: 'hidden' });
    await page.click('#publishDataSetButton');
    await page.waitForTimeout(10000); // 发送10s数据后停止发送
    await page.click('#publishDataSetButton');
  });

  test('成功接收到数据', async ({ page }) => {
    await checkTableRowLength(page, 3);
  });

  test('成功通过下拉框筛选数据', async ({ page }) => {
    const res_before = await getTableTotal(page);
    await setQuerySelectValue(page, '#collisionType', 1);
    const res_after = await getTableTotal(page);
    expect(Number(res_before)).toBeGreaterThan(Number(res_after));
  });
});

import { test } from '@playwright/test';
import { generatePureNumber } from '../../utils';
import { globalModalSubmitBtn, setModalFormItemValue } from '../../utils/form';
import {
  checkDetailUrl,
  checkSuccessMsg,
  gotoPageAndExpectUrl,
  useUserStorageState,
} from '../../utils/global';

import { clickBackToListBtn } from '../../utils/detail';
import {
  clickConfirmModalOkBtn,
  clickCreateBtn,
  clickDeleteTextBtn,
  clickDetailTextBtn,
  clickEditBtn,
  searchItemAndQuery,
} from '../../utils/table';

test.describe('The Business Page', () => {
  const randomNum = generatePureNumber();
  const businessNameVal = `business_name_${1}`;
  const pageUrl = '/maintenance/business';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await gotoPageAndExpectUrl(page, pageUrl);
  });

  test('successfully create Business', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', businessNameVal);

    await page.check('text="全局采样"');
    await setModalFormItemValue(page, '#bsm_sampleRate', randomNum);
    await setModalFormItemValue(page, '#bsm_upLimit', randomNum);
    await setModalFormItemValue(page, '#rsm_upLimit', randomNum);
    await setModalFormItemValue(page, '#map_upLimit', randomNum);
    await setModalFormItemValue(page, '#spat_upLimit', randomNum);
    await page.click('text="配置 RSU"');
    await page.click(':nth-match(.ant-checkbox-wrapper, 2)'); // 选择第一个 RSU
    await page.click('.ant-modal-footer > button:nth-child(2)'); // 配置 RSU 的确定按钮

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully edit business', async ({ page }) => {
    await searchItemAndQuery(page, '#name', businessNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${businessNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view  detail', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${businessNameVal}`);
    await clickDetailTextBtn(page);
    await checkDetailUrl(page, pageUrl);
    await clickBackToListBtn(page);
  });

  test('successfully delete business', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${businessNameVal}`);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});

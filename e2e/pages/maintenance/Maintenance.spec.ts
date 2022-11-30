import { test } from '@playwright/test';
import { generatePureNumber } from '../../utils';
import { gotoPageAndExpectUrl, useUserStorageState, checkSuccessMsg } from '../../utils/global';
import { setModalFormItemValue, globalModalSubmitBtn, setSelectValue } from '../../utils/form';

import {
  clickEditBtn,
  clickDownTextBtn,
  clickCopyBtn,
  searchItemAndQuery,
} from '../../utils/table';

test.describe('The Maintenance Page', () => {
  const M_NameVal = 'RSU01';
  const randomNum = generatePureNumber();
  const pageUrl = '/maintenance/maintenance';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await gotoPageAndExpectUrl(page, pageUrl);
  });

  test('successfully edit maintenance', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuName', M_NameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#hbRate', randomNum);
    await setModalFormItemValue(page, '#runningInfoRate', randomNum);
    await setSelectValue(page, 'logLevel', '#logLevel_list');
    await setSelectValue(page, 'reboot', '#reboot_list');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully down RSU maintenance configuration', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuName', M_NameVal);
    await clickDownTextBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully copy RSU maintenance configuration', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuName', M_NameVal);
    await clickCopyBtn(page);
    await setSelectValue(page, 'rsus', '#rsus_list');
    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });
});

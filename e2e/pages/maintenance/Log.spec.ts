import { test } from '@playwright/test';
import { generateNumLetter } from '../../utils';
import { gotoPageAndExpectUrl, useUserStorageState, checkSuccessMsg } from '../../utils/global';
import { setModalFormItemValue, setSelectValue, globalModalSubmitBtn } from '../../utils/form';

import {
  clickCreateBtn,
  clickEditBtn,
  clickDeleteTextBtn,
  clickConfirmModalOkBtn,
} from '../../utils/table';

test.describe('The Log Page', () => {
  const randomNumLetter = generateNumLetter();
  const pageUrl = '/maintenance/log';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await gotoPageAndExpectUrl(page, pageUrl);
  });

  test('successfully create log', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#uploadUrl', randomNumLetter);
    await setModalFormItemValue(page, '#userId', randomNumLetter);
    await setModalFormItemValue(page, '#password', randomNumLetter);
    await setSelectValue(page, 'transprotocal', '#transprotocal_list');
    await setSelectValue(page, 'rsus', '#rsus_list');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully edit log', async ({ page }) => {
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#uploadUrl', `update_${randomNumLetter}`);
    await setModalFormItemValue(page, '#userId', `update_${randomNumLetter}`);
    await setModalFormItemValue(page, '#password', `update_${randomNumLetter}`);
    await setSelectValue(page, 'transprotocal', '#transprotocal_list');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully delete log', async ({ page }) => {
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});

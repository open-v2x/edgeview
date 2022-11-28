import { test } from '@playwright/test';
import { generateNumLetter } from '../../utils';
import { gotPageAndExpectUrl, useUserStorageState, checkSuccessMsg } from '../../utils/global';
import { setModalFormItemValue, globalModalSubmitBtn } from '../../utils/form';
import {
  clickCreateBtn,
  clickEditBtn,
  clickConfirmModalOkBtn,
  clickDeleteTextBtn,
  searchItemAndQuery,
} from '../../utils/table';

test.describe('The RsuModel Page', () => {
  const randomNumLetter = generateNumLetter();
  const rsumodelNameVal = `spat_name_${1}`;
  const manufacturerVal = `C_${randomNumLetter}`;
  const descVal = 'test description info';
  const pageUrl = '/device/model';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await gotPageAndExpectUrl(page, pageUrl);
  });

  test('successfully create rsumodel', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', rsumodelNameVal);
    await setModalFormItemValue(page, '#manufacturer', manufacturerVal);
    await setModalFormItemValue(page, '#desc', descVal);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully edit rsumodel', async ({ page }) => {
    await searchItemAndQuery(page, '#name', rsumodelNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${rsumodelNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully delete rsumodel', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${rsumodelNameVal}`);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});

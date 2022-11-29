import { test } from '@playwright/test';
import { generateNumLetter } from '../../utils';
import {
  gotoPageAndExpectUrl,
  useUserStorageState,
  checkSuccessMsg,
  uploadFile,
  checkDetailUrl,
} from '../../utils/global';
import { setModalFormItemValue, setCascaderValue, globalModalSubmitBtn } from '../../utils/form';

import {
  clickCreateBtn,
  clickEditBtn,
  clickDetailTextBtn,
  clickDeleteTextBtn,
  clickConfirmModalOkBtn,
  searchItemAndQuery,
} from '../../utils/table';
import { clickBackToListBtn } from '../../utils/detail';

test.describe('The MAP Page', () => {
  const randomNumLetter = generateNumLetter();
  const mapNameVal = `map_name_${1}`;
  const provinceNameVal = [0, 1, 2, 4];
  const addressVal = `address ${randomNumLetter}`;
  const descVal = 'test description info';
  const pageUrl = '/maintenance/map';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await gotoPageAndExpectUrl(page, pageUrl);
  });

  test('successfully create map', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', mapNameVal);
    await setModalFormItemValue(page, '#address', addressVal);
    await setModalFormItemValue(page, '#desc', descVal);
    await setCascaderValue(page, 'province', provinceNameVal);
    await uploadFile(page, '#data', './e2e/testdata/MapExample.json');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully edit map', async ({ page }) => {
    await searchItemAndQuery(page, '#name', mapNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${mapNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view map detail', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${mapNameVal}`);
    await clickDetailTextBtn(page);
    await checkDetailUrl(page, pageUrl);
    await clickBackToListBtn(page);
  });

  test('successfully delete map', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${mapNameVal}`);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});

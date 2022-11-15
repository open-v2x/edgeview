import { test } from '@playwright/test';
import { generateIntNum, generateNumLetter, generatePureNumber } from '../../utils';
import { gotPageAndExpectUrl, useUserStorageState, checkSuccessMsg } from '../../utils/global';
import {
  setModalFormItemValue,
  setSelectValue,
  setCascaderValue,
  globalModalSubmitBtn,
} from '../../utils/form';
import {
  clickCreateBtn,
  clickEditBtn,
  clickEnableDisableBtn,
  clickDetailBtn,
  clickDeleteBtn,
  clickConfirmModalOkBtn,
  searchItemAndQuery,
} from '../../utils/table';
import { clickBackToListBtn } from '../../utils/detail';

test.describe('The Rsu Page', () => {
  const randomNumLetter = generateNumLetter();
  const randomNum = generatePureNumber();
  const rsuNameVal = `rsu_name_${1}`;
  const rsuEsnVal = `R_${randomNumLetter}`;
  const rsuIdVal = `${randomNum}`;
  const rsuIPVal = [
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
  ].join('.');
  const provinceNameVal = [0, 1, 2, 4];
  const addressVal = `address ${randomNumLetter}`;
  const descVal = 'test description info';
  const pageUrl = '/device/rsu';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await gotPageAndExpectUrl(page, pageUrl);
  });

  test('successfully create rsu', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#rsuName', rsuNameVal);
    await setModalFormItemValue(page, '#rsuEsn', rsuEsnVal);
    await setModalFormItemValue(page, '#rsuId', rsuIdVal);
    await setModalFormItemValue(page, '#rsuIP', rsuIPVal);
    await setModalFormItemValue(page, '#address', addressVal);
    await setModalFormItemValue(page, '#desc', descVal);
    await setSelectValue(page, 'rsuModelId');
    await setCascaderValue(page, 'province', provinceNameVal);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully edit rsu', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuName', rsuNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#rsuName', rsuNameVal);
    await setModalFormItemValue(page, '#rsuEsn', rsuEsnVal);
    await setModalFormItemValue(page, '#rsuId', rsuIdVal);
    await setModalFormItemValue(page, '#rsuIP', rsuIPVal);
    await setModalFormItemValue(page, '#address', `update ${addressVal}`);
    await setModalFormItemValue(page, '#desc', `update ${descVal}`);
    await setSelectValue(page, 'rsuModelId');
    await setCascaderValue(page, 'province', [0, 1, 2, 5]);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view detail', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuName', rsuNameVal);
    await clickDetailBtn(page, pageUrl);
    await clickBackToListBtn(page);
  });

  test('successfully enable and disable rsu', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuName', rsuNameVal);
    await clickEnableDisableBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully delete rsu', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuName', rsuNameVal);
    await clickDeleteBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});

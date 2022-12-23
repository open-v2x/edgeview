import { test } from '@playwright/test';
import { generateIntNum, generateNumLetter, generatePureNumber } from '../../utils';
import { globalModalSubmitBtn, setModalFormItemValue, setSelectValue } from '../../utils/form';
import {
  checkDetaillWindow,
  checkSuccessMsg,
  closePopWindow,
  gotoPageAndExpectUrl,
  useUserStorageState,
} from '../../utils/global';
import {
  clickConfirmModalOkBtn,
  clickCreateBtn,
  clickDeleteTextBtn,
  clickDetailTextBtn,
  clickEditBtn,
  clickEnableDisableTextBtn,
  searchItemAndQuery,
} from '../../utils/table';

test.describe('The Lidar Page', () => {
  const randomNumLetter = generateNumLetter();
  const randomNum = generatePureNumber();
  const lidarNameVal = `lidar_name_${1}`;
  const lidarnSnVal = `C_${randomNumLetter}`;
  const lng = generateIntNum({ max: 180 });
  const lat = generateIntNum({ max: 90 });
  const descVal = 'test description info';
  const pageUrl = '/device/lidar';
  const lidarIPVal = [
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
  ].join('.');
  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await gotoPageAndExpectUrl(page, pageUrl);
  });

  test('successfully create lidar', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', lidarNameVal);
    await setModalFormItemValue(page, '#sn', lidarnSnVal);
    await setModalFormItemValue(page, '#lng', String(lng));
    await setModalFormItemValue(page, '#lat', String(lat));
    await setModalFormItemValue(page, '#elevation', randomNum);
    await setModalFormItemValue(page, '#towards', randomNum);
    await setModalFormItemValue(page, '#lidarIP', lidarIPVal);
    await setModalFormItemValue(page, '#point', randomNumLetter);
    await setModalFormItemValue(page, '#pole', randomNumLetter);
    await setModalFormItemValue(page, '#wsUrl', randomNumLetter);
    await setModalFormItemValue(page, '#desc', descVal);
    await setSelectValue(page, 'rsuId', '#rsuId_list');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully edit lidar', async ({ page }) => {
    await searchItemAndQuery(page, '#name', lidarNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${lidarNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view  lidar detail', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${lidarNameVal}`);
    await clickDetailTextBtn(page);
    await checkDetaillWindow(page);
    await closePopWindow(page);
  });

  test('successfully enable and disable lidar', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${lidarNameVal}`);
    await clickEnableDisableTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully delete lidar', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${lidarNameVal}`);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});

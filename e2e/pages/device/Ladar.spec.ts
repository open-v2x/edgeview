import { test } from '@playwright/test';
import { generateIntNum, generateNumLetter, generatePureNumber } from '../../utils';
import {
  gotoPageAndExpectUrl,
  useUserStorageState,
  checkSuccessMsg,
  checkDetaillWindow,
  closePopWindow,
} from '../../utils/global';
import { setModalFormItemValue, setSelectValue, globalModalSubmitBtn } from '../../utils/form';
import {
  clickCreateBtn,
  clickEditBtn,
  clickConfirmModalOkBtn,
  clickDetailTextBtn,
  clickDeleteTextBtn,
  searchItemAndQuery,
} from '../../utils/table';

test.describe('The Ladar Page', () => {
  const randomNumLetter = generateNumLetter();
  const randomNum = generatePureNumber();
  const ladarNameVal = `ladar_name_${1}`;
  const ladarnSnVal = `C_${randomNumLetter}`;
  const lng = generateIntNum({ max: 180 });
  const lat = generateIntNum({ max: 90 });
  const descVal = 'test description info';
  const pageUrl = '/device/radar';
  const ladarIPVal = [
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

  test('successfully create ladar', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', ladarNameVal);
    await setModalFormItemValue(page, '#sn', ladarnSnVal);
    await setModalFormItemValue(page, '#lng', String(lng));
    await setModalFormItemValue(page, '#lat', String(lat));
    await setModalFormItemValue(page, '#elevation', randomNum);
    await setModalFormItemValue(page, '#towards', randomNum);
    await setModalFormItemValue(page, '#radarIP', ladarIPVal);
    await setModalFormItemValue(page, '#desc', descVal);
    await setSelectValue(page, 'rsuId', '#rsuId_list');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully edit ladar', async ({ page }) => {
    await searchItemAndQuery(page, '#name', ladarNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${ladarNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view  ladar detail', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${ladarNameVal}`);
    await clickDetailTextBtn(page);
    await checkDetaillWindow(page);
    await closePopWindow(page);
  });

  test('successfully delete ladar', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${ladarNameVal}`);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});

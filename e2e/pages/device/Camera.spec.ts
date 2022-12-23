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
  searchItemAndQuery,
} from '../../utils/table';

test.describe('The Camera Page', () => {
  const randomNumLetter = generateNumLetter();
  const randomNum = generatePureNumber();
  const cameraNameVal = `camera_name_${1}`;
  const camernSnVal = `C_${randomNumLetter}`;
  const videoUrl = generateNumLetter();
  const lng = generateIntNum({ max: 180 });
  const lat = generateIntNum({ max: 90 });
  const descVal = 'test description info';
  const pageUrl = '/device/camera';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await gotoPageAndExpectUrl(page, pageUrl);
  });

  test('successfully create camera', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', cameraNameVal);
    await setModalFormItemValue(page, '#sn', camernSnVal);
    await setModalFormItemValue(page, '#streamUrl', videoUrl);
    await setModalFormItemValue(page, '#lng', String(lng));
    await setModalFormItemValue(page, '#lat', String(lat));
    await setModalFormItemValue(page, '#elevation', randomNum);
    await setModalFormItemValue(page, '#towards', randomNum);
    await setModalFormItemValue(page, '#desc', descVal);
    await setSelectValue(page, 'rsuId', '#rsuId_list');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully edit camera', async ({ page }) => {
    await searchItemAndQuery(page, '#name', cameraNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${cameraNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view detail', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${cameraNameVal}`);
    await clickDetailTextBtn(page);
    await checkDetaillWindow(page);
    await closePopWindow(page);
  });

  test('successfully delete camera', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${cameraNameVal}`);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});

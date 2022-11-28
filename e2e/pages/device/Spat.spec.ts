import { test } from '@playwright/test';
import { generateIntNum, generateNumLetter } from '../../utils';
import {
  gotPageAndExpectUrl,
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
  clickEnableDisableTextBtn,
} from '../../utils/table';

test.describe('The Spat Page', () => {
  const randomNumLetter = generateNumLetter();
  const spatNameVal = `spat_name_${1}`;
  const spatSnVal = `C_${randomNumLetter}`;
  const phaseId = generateIntNum({ max: 255 });
  const descVal = 'test description info';
  const pageUrl = '/device/spat';
  const spatIPVal = [
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
  ].join('.');
  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await gotPageAndExpectUrl(page, pageUrl);
  });

  test('successfully create spat', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', spatNameVal);
    await setModalFormItemValue(page, '#intersectionId', spatSnVal);
    await setModalFormItemValue(page, '#phaseId', String(phaseId));
    await setModalFormItemValue(page, '#spatIP', spatIPVal);
    await setModalFormItemValue(page, '#point', randomNumLetter);
    await setModalFormItemValue(page, '#desc', descVal);
    await setSelectValue(page, 'rsuId', '#rsuId_list');
    await setSelectValue(page, 'light', '#light_list');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully edit spat', async ({ page }) => {
    await searchItemAndQuery(page, '#name', spatNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${spatNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view  spat detail', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${spatNameVal}`);
    await clickDetailTextBtn(page);
    await checkDetaillWindow(page);
    await closePopWindow(page);
  });

  test('successfully enable and disable spat', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${spatNameVal}`);
    await clickEnableDisableTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully delete spat', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${spatNameVal}`);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});

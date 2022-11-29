import { test } from '@playwright/test';
import {
  gotoPageAndExpectUrl,
  useUserStorageState,
  checkSuccessMsg,
  checkDetailUrl,
} from '../../utils/global';
import { setSelectValue, setQuerySelectValue, globalModalSubmitBtn } from '../../utils/form';
import { clickBackToListBtn } from '../../utils/detail';
import {
  clickDetailTextBtn,
  clickCreateBtn,
  clickDeleteTextBtn,
  clickConfirmModalOkBtn,
} from '../../utils/table';

test.describe('The Query Page', () => {
  const pageUrl = '/maintenance/query';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await gotoPageAndExpectUrl(page, pageUrl);
  });

  test('successfully create query', async ({ page }) => {
    await clickCreateBtn(page);

    await setSelectValue(page, 'queryType', '#queryType_list');
    await setSelectValue(page, 'timeType', '#timeType_list');
    await setSelectValue(page, 'rsus', '#rsus_list');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view detail', async ({ page }) => {
    await setQuerySelectValue(page, '#rsuId');
    await clickDetailTextBtn(page);
    await checkDetailUrl(page, pageUrl);
    await clickBackToListBtn(page);
  });

  test('successfully delete query', async ({ page }) => {
    await setQuerySelectValue(page, '#rsuId');
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});

import { expect, test } from '@playwright/test';
import { checkErrorMsg, saveUserStorageState } from '../utils/global';

const username = 'admin';
const password = 'dandelion';

export default test.describe('The Login page', () => {
  test('successfully login and check menu', async ({ page }) => {
    await page.goto('/user/login');

    await page.fill('#username', username);
    await page.fill('#password', password);
    const submitBtn = page.locator('.ant-form button.ant-btn');
    await submitBtn.click();
    await expect(page).toHaveURL('/device/rsu');

    // Save signed-in state to 'userStorageState.json'.
    await saveUserStorageState(page);
  });

  test('successfully error username and password', async ({ page }) => {
    await page.goto('/user/login');

    await page.fill('#username', `${username}0`);
    await page.fill('#password', `${password}0`);
    const submitBtn = page.locator('.ant-form button.ant-btn');
    await submitBtn.click();
    await checkErrorMsg(page);
  });
});

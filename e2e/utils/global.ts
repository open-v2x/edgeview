import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import Login from '../pages/login.spec';

export const gotoPageAndExpectUrl = async (page: Page, url: string) => {
  await Login;
  await page.goto(url);
  await expect(page).toHaveURL(new RegExp(url));
};

// Save signed-in state to 'userStorageState.json'.
export const saveUserStorageState = async (page: Page) => {
  await page.context().storageState({ path: 'e2e/storage/userStorageState.json' });
};

// Use signed-in state of 'userStorageState.json'.
export const useUserStorageState = () => {
  test.use({ storageState: 'e2e/storage/userStorageState.json' });
};

export const checkSuccessMsg = async (page: Page) => {
  return await expect(page.locator('.ant-message .ant-message-success')).toBeVisible();
};

export const checkErrorMsg = async (page: Page) => {
  return await expect(page.locator('.ant-message .ant-message-error')).toBeVisible();
};

export const checkDetaillWindow = async (page: Page) => {
  return await expect(page.locator('.ant-modal-content')).toBeVisible();
};

export const closePopWindow = async (page: Page) => {
  await page.locator('.ant-modal-close-x').click();
};

export const uploadFile = async (page: Page, selector: string, file_path: string) => {
  await page.setInputFiles(selector, file_path);
};

export const checkDetailUrl = async (page: Page, pageUrl: string) => {
  await expect(page).toHaveURL(new RegExp(`${pageUrl}/details`));
};

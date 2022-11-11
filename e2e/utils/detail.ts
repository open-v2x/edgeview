import type { Page } from '@playwright/test';

export const clickBackToListBtn = async (page: Page, delay = 1000) => {
  await page.locator('.ant-page-header #backButton').click({ delay });
};

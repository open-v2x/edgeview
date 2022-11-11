import { test, expect } from '@playwright/test';
import { saveUserStorageState } from '../utils/global';

export default test.describe('Login Api', () => {
  const username = 'admin';
  const password = 'dandelion';
  const baseURL = 'http://localhost:8000';

  test('login api', async ({ page, request }) => {
    const loginRes: any = await request.post(`${baseURL}/v1/login`, {
      data: {
        username,
        password,
      },
    });
    expect(loginRes.ok()).toBeTruthy();
    await saveUserStorageState(page);
  });
});

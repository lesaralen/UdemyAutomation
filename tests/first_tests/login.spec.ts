import { test } from '@playwright/test';

test('login to Zero Bank', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html');
  await page.getByRole('button', { name: ' Signin' }).click();
  await page.getByRole('textbox', { name: 'Login' }).fill('alen');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234567');
  await page.getByRole('button', { name: 'Sign in' }).click();
});

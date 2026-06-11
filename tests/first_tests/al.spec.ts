import { test, expect } from '@playwright/test'


test('basic test', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html');

    await page.getByRole('button', { name: 'Signin' }).click()

    await page.waitForTimeout(50)

});

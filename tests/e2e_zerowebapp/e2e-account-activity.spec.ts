import { test , expect } from '@playwright/test'



test.describe('Check account activity', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com');
        await page.getByRole('button', { name: 'Signin' }).click();

        await page.getByRole('textbox', { name: 'Login' }).fill('username');
        await page.getByRole('textbox', { name: 'Password' }).fill('password');

        await page.getByRole('button', { name: 'Sign in' }).click();

        await page.waitForTimeout(1000);
        await page.goto('http://zero.webappsecurity.com/bank/account-activity.html');

    
    
    })

    test('Select account and view activity', async ({ page }) => {

        const AccountSelector = page.getByRole('combobox', { name: 'Account' });
        
        AccountSelector.selectOption('2');
        const checkingAccount = await page.locator('#all_transactions_for_account tbody tr');
        await expect(checkingAccount).toHaveCount(3);

        AccountSelector.selectOption('4');
        await expect(checkingAccount).toHaveCount(2);

        AccountSelector.selectOption('5');
        const noResults = await page.locator('.well');
        await expect(noResults).toBeVisible();
        await expect(noResults).toHaveText('No results.');


    })

})
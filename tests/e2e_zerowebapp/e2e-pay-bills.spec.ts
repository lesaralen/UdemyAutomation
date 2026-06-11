import { test , expect } from '@playwright/test'



test.describe('Pay Bills', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com');
        await page.getByRole('button', { name: 'Signin' }).click();

        await page.getByRole('textbox', { name: 'Login' }).fill('username');
        await page.getByRole('textbox', { name: 'Password' }).fill('password');

        await page.getByRole('button', { name: 'Sign in' }).click();

        await page.waitForTimeout(1000);
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html');
    })

    test('Make payment', async ({ page }) => {

        await page.getByRole('combobox', { name: 'Payee' }).selectOption('Wells Fargo');
        await page.locator('#sp_get_payee_details').click();
        await page.locator('#sp_payee_details').waitFor();
        await page.getByRole('combobox', { name: 'Account' }).selectOption('Brokerage');
        await page.getByRole('textbox', { name: 'Amount' }).fill('1000');
        await page.getByRole('textbox', { name: 'Date' }).fill('2026-05-06');
        await page.getByRole('textbox', { name: 'Description' }).fill('Test payment from account Brokerage to payee Wells Fargo on 2026-05-06 for amount 1000');
        await page.getByRole('button', { name: 'Pay' }).click();

        await expect(page).toHaveURL('http://zero.webappsecurity.com/bank/pay-bills-saved-payee.html');

        await page.getByText('The payment was successfully submitted.', { exact: true }).waitFor();

        const successMessage = await page.locator('#alert_content');
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('The payment was successfully submitted.');

    })

})
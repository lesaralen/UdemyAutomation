import { test , expect } from '@playwright/test'


test.describe('Transfer Funds and Make Payments', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com');
        await page.getByRole('button', { name: 'Signin' }).click();

        await page.getByRole('textbox', { name: 'Login' }).fill('username');
        await page.getByRole('textbox', { name: 'Password' }).fill('password');

        await page.getByRole('button', { name: 'Sign in' }).click();

        await page.waitForTimeout(1000);
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');

    
    
    })


    test('Should transfer funds between accounts', async ({ page }) => {

        await page.getByRole('combobox', { name: 'From Account' }).selectOption('2');
        await page.getByRole('combobox', { name: 'To Account' }).selectOption('4');
        await page.getByRole('textbox', { name: 'Amount' }).fill('500');
        await page.getByRole('textbox', { name: 'Description' }).fill('Test transfer from account 2 to account 4');
        await page.getByRole('button', { name: 'Continue' }).click();


        await expect(page).toHaveURL('http://zero.webappsecurity.com/bank/transfer-funds-verify.html');
        await page.getByRole('heading', { name: 'Transfer Money & Make Payments - Verify', level: 2 }).waitFor();

        await page.getByRole('button', { name: 'Submit' }).click()

        const successMessage = await page.locator('.alert.alert-success');
        await expect(successMessage).toContainText('You successfully submitted your transaction.');

    })


})
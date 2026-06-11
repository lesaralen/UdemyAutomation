import { test , expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';



test.describe('Pay Bills', () => {

    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
    
        await homePage.visit();
        await homePage.clickSignIn();
        await loginPage.login('username', 'password');

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
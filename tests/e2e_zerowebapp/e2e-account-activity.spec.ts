import { test , expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';

test.describe('Check account activity', () => {

    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await homePage.visit();
        await homePage.clickSignIn();
        await loginPage.login('username', 'password');
    
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
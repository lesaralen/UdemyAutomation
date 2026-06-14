import { test  } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import {AccountActivityPage} from '../../page-objects/AccountActivityPage';

test.describe('Check account activity', () => {

    let homePage: HomePage;
    let loginPage: LoginPage;
    let accountActivityPage: AccountActivityPage;

    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        accountActivityPage = new AccountActivityPage(page);

        await homePage.visit();
        await homePage.clickSignIn();
        await loginPage.login('username', 'password');
    
        await page.waitForTimeout(1000);
        await page.goto('http://zero.webappsecurity.com/bank/account-activity.html');
    })

    test('Select account and view activity', async ({ page }) => {

        
        await accountActivityPage.selectAccount('2');
        await accountActivityPage.getTransactionCount(3);
        
        await accountActivityPage.selectAccount('4');
        await accountActivityPage.getTransactionCount(2);

        await accountActivityPage.selectAccount('5');
        await accountActivityPage.verifyNoResultsMessage();
        
    })

})
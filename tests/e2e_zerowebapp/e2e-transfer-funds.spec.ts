import { test  } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { TransferFundsPage } from '../../page-objects/TransferFundsPage';


test.describe('Transfer Funds and Make Payments', () => {

    let homePage: HomePage;
    let loginPage: LoginPage;
    let transferFundsPage: TransferFundsPage;

    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        transferFundsPage = new TransferFundsPage(page);
        
        await homePage.visit();
        await homePage.clickSignIn();
        await loginPage.login('username', 'password');  

        await page.waitForTimeout(1000);
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');

    })


    test('Should transfer funds between accounts', async ({ page }) => {

        await transferFundsPage.transferFunds('2', '4', '500', '2026-05-06', 'Test transfer from account 2 to account 4');
        await transferFundsPage.getSuccessMessage();

    })


})
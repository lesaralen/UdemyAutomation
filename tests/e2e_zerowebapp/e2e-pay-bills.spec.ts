import { test , expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { PaymentPage } from '../../page-objects/PaymentPage';
import { Navbar } from '../../page-objects/components/Navbar';

test.describe('Pay Bills', () => {

    let homePage: HomePage;
    let loginPage: LoginPage;
    let paymentPage: PaymentPage;
    let navbar: Navbar;

    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        paymentPage = new PaymentPage(page);
            navbar = new Navbar(page);
    
        await homePage.visit();
        await homePage.clickSignIn();
        await loginPage.login('username', 'password')

        await loginPage.wait(1000);
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html');
    })

    test('Make payment', async ({ page }) => {

        await paymentPage.makePayment('Wells Fargo', 'Brokerage', '1000', '2026-05-06', 'Test payment from account Brokerage to payee Wells Fargo on 2026-05-06 for amount 1000');

        await expect(page).toHaveURL('http://zero.webappsecurity.com/bank/pay-bills-saved-payee.html');

        await paymentPage.getSuccessMessage();
    })

    // This test is to verify that we can switch to Pay Bills tab using the Navbar component.
    // test ('Switch to Pay Bills tab using Navbar', async ({ page }) => {

    //     await navbar.clickOnTab('Account Summary');
    //     await page.waitForTimeout (10000);
    // 



})
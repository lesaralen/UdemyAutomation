import { test , expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { PayBillsNavbar } from '../../page-objects/components/PayBillsNavbar';
import { PaymentPage } from '../../page-objects/PaymentPage';



test.describe.parallel.only('Currency Exchange', () => {

    let homePage: HomePage;
    let loginPage: LoginPage;
    let payBillsNavbar: PayBillsNavbar;
    let paymentPage: PaymentPage;
   
    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        payBillsNavbar = new PayBillsNavbar(page);
        paymentPage = new PaymentPage(page);

        await homePage.visit();
        await homePage.clickSignIn();
        await loginPage.login('username', 'password');
        
        
        await page.waitForTimeout(1000);
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html');

    })

    test('Purchase currency selected', async ({ page }) => {
        await payBillsNavbar.clickOnTab('Purchase Foreign Currency');
        await paymentPage.purchaseCurrency('EUR', '1234.56', 'selected');
        await paymentPage.getPurchaseSuccessMessage();
    })

    
    test('Purchase currency USD', async ({ page }) => {
        await payBillsNavbar.clickOnTab('Purchase Foreign Currency');
        await paymentPage.purchaseCurrency('EUR', '1234.56', 'usd');
        await paymentPage.getPurchaseSuccessMessage();
    })

})
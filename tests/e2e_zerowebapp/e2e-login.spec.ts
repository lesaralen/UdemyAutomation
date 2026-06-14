import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';


test.describe.parallel('Zero Web App Login Tests', () => {
   let loginPage: LoginPage;
   let homePage: HomePage;
   
   
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);

        await homePage.visit();
    })
 
    test('Negative Login', async ({ page }) => {
       await homePage.clickSignIn();
       await loginPage.login('randomuser', 'randompassword');
       await loginPage.getErrorMessage();

});

    test('Positive Login + Logout', async ({ page }) => {
        await homePage.clickSignIn();
        await loginPage.login('username', 'password');  
        await loginPage.wait(1000);
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');

        await page.locator('.icon-user').click();
        await page.getByRole('link', { name: 'Logout' }).click();
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html');

});

})


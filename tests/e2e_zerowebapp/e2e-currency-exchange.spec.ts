import { test , expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';


test.describe('Currency Exchange', () => {

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

    test('Purchase currency', async ({ page }) => {
       await page.getByRole('link', { name: 'Purchase Foreign Currency' }).click(); 
       await page.getByRole('combobox', { name: 'Currency' }).selectOption('CHF');
       
       const sellRate = await page.locator('#sp_sell_rate');
        await expect(sellRate).toBeVisible();
        await expect(sellRate).toContainText('1 franc (CHF) =');
       
       const amountInput = await page.getByRole('textbox', { name: 'Amount' });
        await amountInput.fill('1000');
    
       await page.getByLabel('Selected currency').click(); 

       await page.getByRole('button', { name: 'Calculate Costs' }).click();
       const conversionAmount =  await page.locator('#pc_conversion_amount');
        await expect(conversionAmount).toBeVisible();
        await expect(conversionAmount).toContainText('1000.00 franc (CHF) = 1138.30 U.S. dollar (USD)');

    

       await page.getByRole('button', { name: 'Purchase' }).click();

       const successMessage = await page.locator('#alert_content');
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toHaveText('Foreign currency cash was successfully purchased.');
    })

})
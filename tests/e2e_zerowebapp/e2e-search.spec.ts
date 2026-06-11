import  { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Zero Web App Search Tests', () => {
    
    test("Shoud find search results", async ({ page }) => {

        let homePage: HomePage = new HomePage(page);

        //await page.goto('http://zero.webappsecurity.com/index.html');
        //await page.getByRole('textbox', { name: 'Search' }).fill('bank');
        //await page.keyboard.press('Enter');
        
        await homePage.visit();
        await homePage.searchFor('bank');

        const numberOfResults = await page.locator(`ul > li > a`);
        await expect(numberOfResults).toHaveCount(2);

    })

    
    test("Should show no results found", async ({ page }) => {
        
         let homePage: HomePage = new HomePage(page);
         await homePage.visit();
         await homePage.searchFor('some random text');
          
         const numberOfResults = await page.locator(`ul > li > a`);
         await expect(numberOfResults).toHaveCount(0);

    })
    
})
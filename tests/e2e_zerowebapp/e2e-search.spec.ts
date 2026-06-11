import  { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Zero Web App Search Tests', () => {

    let homePage: HomePage;


    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
    })
    
    test("Shoud find search results", async ({ page }) => {

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
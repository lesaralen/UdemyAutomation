import  { test, expect, Page } from '@playwright/test';


test.describe('Zero Web App Search Tests', () => {

    
    test("Shoud find search results", async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html');

        await page.getByRole('textbox', { name: 'Search' }).fill('bank');

        await page.keyboard.press('Enter');
        
        const numberOfResults = await page.locator(`ul > li > a`);
        await expect(numberOfResults).toHaveCount(2);

    })

    /*
    test("Should show no results found", async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html');


    })
    */
})
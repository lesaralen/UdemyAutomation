import { test, expect } from '@playwright/test';

test.describe('Visual Regression Testing', () => {

    test ('Full Page snapshot', async ({ page }) => {
        await page.goto('https://www.example.com');
        expect (await page.screenshot()).toMatchSnapshot('homepage.png');
    });


test('Single element snapshot', async ({ page }) => {
    await page.goto('https://www.example.com');
    const pageElement = page.locator('h1');

    if (!pageElement) {
        throw new Error('Failed to find h1 element');
    }

    expect(await pageElement.screenshot()).toMatchSnapshot('page-title.png');
});



})

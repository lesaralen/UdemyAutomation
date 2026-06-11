import { test, expect } from '@playwright/test'


test.describe.parallel('Parabank Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    })

    test('Negative Login', async ({ page }) => {
    
    await page.locator('[name="username"]').fill('randomuser');
    await page.locator('[name="password"]').fill('randompassword');

    await page.getByRole('button', { name: 'Log In' }).click();

    const element = await page.locator('.error');
    await expect(element).toBeVisible();
    await expect(element).toHaveText('The username and password could not be verified.');

});


test('Positive Login + Logout', async ({ page }) => {
    
    await page.locator('[name="username"]').fill('username14');
    await page.locator('[name="password"]').fill('12345678');

    await page.getByRole('button', { name: 'Log In' }).click();

    const AccountsOverview = await page.getByRole('heading', { name: 'Accounts Overview', level: 1 });
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/overview.htm');
    await expect(AccountsOverview).toBeVisible();
    await expect(AccountsOverview).toHaveText('Accounts Overview');

    await page.getByRole('link', { name: 'Log Out' }).click();
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC');
    
}); 




    
}
)


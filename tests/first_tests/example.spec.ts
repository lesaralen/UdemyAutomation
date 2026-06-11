import { test, expect } from '@playwright/test'


import { loadHomepage, assertTitle } from '../../helper'




test ('Simple basic test', async ({page}) => {
    await page.goto('https://www.example.com')
    const pageTitle = await page.locator ('H1')
    await expect(pageTitle).toContainText("Example Domain")
    
})

test ('Clickin on Elements', async ({page})=>{
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = await page.locator ('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.skip ('selectors', async ({page}) => {

    //text
    await page.click ('text=some text')

    //css
    await page.click ('button')
    await page.click ('#id')
    await page.click ('.class')

    //only visible css selector
    await page.click('.submit-button:visible')

    //combinations
    await page.click ('#username .first')

    //xpath
    await page.click ('//button')
})

//For you as a coder just change page.type() for page.fill() and you are good to go.



test.describe ('My first test suite', () => {

    test ('Working with input', async ({page}) => {
    await page.goto ('http://zero.webappsecurity.com/index.html');
    await page.click("#signin_button");

    await page.fill ('#user_login', 'some username');
    await page.fill ('#user_password', 'some password');

    await page.click ('text=Sign in')
    const errorMessage = await page.locator ('.alert-error');
    await expect(errorMessage).toContainText('Login and/or password are wrong.');
    })

    test ("Assertions @myTag", async ({page}) => {

    await page.goto("https://www.example.com");
    await expect(page).toHaveURL("https://www.example.com");
    await expect(page).toHaveTitle("Example Domain");


    const element = await page.locator("h1");
    await expect(element).toBeVisible();
    await expect(element).toHaveText("Example Domain");
    await expect(element).toHaveCount(1);

    const nonExistingElement = await page.locator("h5");
    await expect(nonExistingElement).not.toBeVisible();
    })
})


test.describe ('Hooks', () => {
    test.beforeEach (async ({page}) => {
         await page.goto("https://www.example.com");
    })

    test ('Screenshot', async ({page}) => {
    await page.screenshot({path: 'screenshots/screenshot.png', fullPage: true})
    })

    test ('Single element Screenshot', async ({page}) => {
    const element = await page.getByRole('heading', { name: 'Example Domain', level: 1 });
    await element.screenshot({path: 'screenshots/element-screenshot.png'})
    })
})


test.only ("Custom helpers", async ({page}) => {
    await loadHomepage(page);
    await page.pause();
    await assertTitle(page);
})


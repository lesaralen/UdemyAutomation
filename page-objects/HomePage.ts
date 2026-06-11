import {expect, Locator, Page} from '@playwright/test';



export class HomePage {
//Define selectors
readonly page: Page;
readonly signInButton: Locator;
readonly searchBox: Locator;


//Init selectors using constructor
constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole('button', { name: 'Signin' });
    this.searchBox = page.getByRole('textbox', { name: 'Search' });
}



//Define home page methods

async visit() {
    await this.page.goto('http://zero.webappsecurity.com');    
    }

async clickSignIn() {
    await this.signInButton.click();
    }

}
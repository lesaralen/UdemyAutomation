import {expect, Locator, Page} from '@playwright/test';



export class HomePage {
//Define selectors
readonly page: Page;
readonly searchBox: Locator;
readonly signInButton: Locator;
readonly feedbackLink: Locator;



//Init selectors using constructor
constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByRole('textbox', { name: 'Search' });
    this.signInButton = page.getByRole('button', { name: 'Signin' });
    this.feedbackLink = page.locator('#feedback');
    
}



//Define home page methods

async visit() {
    await this.page.goto('http://zero.webappsecurity.com');    
    }

async clickSignIn() {
    await this.signInButton.click();
    }

async clickFeedbackLink() {
    await this.feedbackLink.click();
    }

async searchFor(phrase: string) {
    await this.searchBox.fill(phrase);
    await this.searchBox.press('Enter');
    }

}
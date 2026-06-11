import {expect, Locator, Page} from '@playwright/test';

export class LoginPage {
    //Define selectors
    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator
    

    //Init selectors using constructor
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Login' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: 'Sign in' });
        this.errorMessage = page.locator('.alert.alert-error');
    }

    //Define login page methods
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async getErrorMessage() {
        await expect(this.errorMessage).toContainText
            ('Login and/or password are wrong.');
    }

}
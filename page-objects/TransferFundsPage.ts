import {expect, Locator, Page} from '@playwright/test';


export class TransferFundsPage {
    readonly page: Page;
    readonly fromAccountSelect: Locator;
    readonly toAccountSelect: Locator;
    readonly amountInput: Locator;
    readonly descriptionInput: Locator;
    readonly continueButton: Locator
    readonly submitButton: Locator;
    readonly verifyHeader: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fromAccountSelect = page.getByRole('combobox', { name: 'From account' });
        this.toAccountSelect = page.getByRole('combobox', { name: 'To account' });
        this.amountInput = page.getByRole('textbox', { name: 'Amount' });
        this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.verifyHeader = page.getByRole('heading', { name: 'Transfer Money & Make Payments - Verify', level: 2 });
        this.successMessage = page.locator('.alert.alert-success');
    }


    async transferFunds(fromAccount: string, toAccount: string, amount: string, date: string, description: string) {
        await this.fromAccountSelect.selectOption(fromAccount);
        await this.toAccountSelect.selectOption(toAccount);
        await this.amountInput.fill(amount);
        await this.descriptionInput.fill(description);
        await this.continueButton.click();
        await expect(this.verifyHeader).toBeVisible();
        await this.submitButton.click();

    }

    async getSuccessMessage() {
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toContainText('You successfully submitted your transaction.');
    }
}

import { expect, Locator, Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class AccountActivityPage extends AbstractPage {
    //readonly page: Page;
    readonly accountSelector: Locator;
    readonly transactionsTable: Locator;
    readonly noResultsMessage: Locator;


    constructor(page: Page) {
        super(page);
        //this.page = page;
        this.accountSelector = page.getByRole('combobox', { name: 'Account' });
        this.transactionsTable = page.locator('#all_transactions_for_account tbody tr');
        this.noResultsMessage = page.locator('.well');

    }

    async selectAccount(accountValue: string) {
        await this.accountSelector.selectOption(accountValue);
    }

    async getTransactionCount(count: number) {
        await expect(this.transactionsTable).toHaveCount(count);
    }    

    async verifyNoResultsMessage() {
        await expect(this.noResultsMessage).toBeVisible();
        await expect(this.noResultsMessage).toHaveText('No results.');
    }
}
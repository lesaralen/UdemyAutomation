import { expect, Locator, Page } from "@playwright/test";

export class PayBillsNavbar {
    
    readonly page: Page;
    readonly paySavedPayee: Locator;
    readonly addNewPayee: Locator
    readonly purchaseForeignCurrency: Locator;


    constructor(page: Page) {
        this.page = page;
        this.paySavedPayee = page.getByRole('link', { name: 'Pay Saved Payee' });
        this.addNewPayee = page.getByRole('link', { name: 'Add New Payee' });
        this.purchaseForeignCurrency = page.getByRole('link', { name: 'Purchase Foreign Currency' });
    }


    async clickOnTab(linkName: string) {
        switch (linkName) {
            case 'Pay Saved Payee':
                await this.paySavedPayee.click();
                break;
            case 'Add New Payee':
                await this.addNewPayee.click();
                break;
            case 'Purchase Foreign Currency':
                await this.purchaseForeignCurrency.click();
                break;
            default:
                throw new Error(`Link not found: ${linkName}`);
        }
    }

}
import {expect, Locator, Page} from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class PaymentPage extends AbstractPage {
    //readonly page: Page;

    // Locators for Pay Saved Payee section
    readonly payeeSelect: Locator;
    readonly payeeDetailsButton: Locator;
    readonly payeeDetails: Locator
    readonly accountSelect: Locator;
    readonly amountInput: Locator
    readonly dateInput: Locator;
    readonly descriptionInput: Locator
    readonly payButton: Locator;
    readonly successMessage: Locator;

    // Locators for Add New Payee 

    // Locators for Purchase Foreign Currency 
    readonly currencySelect: Locator;
    readonly sellRate: Locator;
    readonly amountCurrencyInput: Locator;
    readonly USDCurrencyRadio: Locator;
    readonly selectedCurrencyRadio: Locator;
    readonly calculateCostsButton: Locator;
    readonly conversionAmount: Locator;
    readonly purchaseButton: Locator;
    readonly purchaseSuccessMessage: Locator;



     
    
    constructor(page: Page) {
        //this.page = page;
        super(page);
        

        // Pay Saved Payee locators
        this.payeeSelect = page.getByRole('combobox', { name: 'Payee' });
        this.payeeDetailsButton = page.locator('#sp_get_payee_details');
        this.payeeDetails = page.locator('#sp_payee_details');
        this.accountSelect = page.getByRole('combobox', { name: 'Account' });
        this.amountInput = page.getByRole('textbox', { name: 'Amount' });
        this.dateInput = page.getByRole('textbox', { name: 'Date' });
        this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
        this.payButton = page.getByRole('button', { name: 'Pay' });
        this.successMessage = page.locator('#alert_content span');

        // Add New Payee locators

        // Purchase Foreign Currency locators
        this.currencySelect = page.getByRole('combobox', { name: 'Currency' });
        this.sellRate = page.locator('#sp_sell_rate');
        this.amountCurrencyInput = page.getByRole('textbox', { name: 'Amount' });
        this.USDCurrencyRadio = page.getByLabel('U.S. dollar (USD)');
        this.selectedCurrencyRadio = page.getByLabel('Selected currency');
        this.calculateCostsButton = page.getByRole('button', { name: 'Calculate Costs' });
        this.conversionAmount = page.locator('#pc_conversion_amount');
        this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
        this.purchaseSuccessMessage = page.locator('#alert_content');
    }


    // Methods for Pay Saved Payee section
    async makePayment(payee: string, account: string, amount: string, date: string, description: string) {
        await this.payeeSelect.selectOption(payee);
        await this.payeeDetailsButton.click();
        await this.payeeDetails.waitFor();
        await this.accountSelect.selectOption(account);
        await this.amountInput.fill(amount);
        await this.dateInput.fill(date);
        await this.descriptionInput.fill(description);
        await this.payButton.click();
    }
    async getSuccessMessage() {
        const successMessage = await this.successMessage;
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('The payment was successfully submitted.');
    }

    // Methods for Add New Payee section

    // Methods for Purchase Foreign Currency section
async purchaseCurrency(currency: string, amount: string, mode: 'selected' | 'usd') {
    await this.currencySelect.selectOption(currency);
    await expect(this.sellRate).toBeVisible();
    await expect(this.sellRate).toContainText(' (' + currency + ') =');
    await this.amountCurrencyInput.fill(amount);

    if (mode === 'usd') {
        await this.USDCurrencyRadio.click();
    } else {
        await this.selectedCurrencyRadio.click();
    }

    await this.calculateCostsButton.click();
    await expect(this.conversionAmount).toBeVisible();

    let pattern;
     if (mode === 'usd') {
        pattern = new RegExp(`\\(${currency}\\) = ${amount}`); } 
        else {
        pattern = new RegExp(`${amount}.*\\(${currency}\\) =`); }

    await expect(this.conversionAmount).toContainText(pattern);
    await this.purchaseButton.click();
    }


    async getPurchaseSuccessMessage() {
        const purchaseSuccessMessage = this.purchaseSuccessMessage;
        await expect(purchaseSuccessMessage).toBeVisible();
        await expect(purchaseSuccessMessage).toHaveText('Foreign currency cash was successfully purchased.');
    }
}
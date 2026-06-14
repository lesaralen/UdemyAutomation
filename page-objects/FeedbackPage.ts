import {expect, Locator, Page} from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class FeedbackPage extends AbstractPage {
    //readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly commentInput: Locator;
    readonly clearButton: Locator;
    readonly submitButton: Locator;
    readonly feedbackMessage: Locator;

    constructor(page: Page) {
        super(page);
        //this.page = page;
        this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.emailInput = page.getByRole('textbox', { name: 'Your email address' });
        this.subjectInput = page.getByRole('textbox', { name: 'Subject' });
        this.commentInput = page.locator('#comment');
        this.clearButton = page.getByRole('button', { name: 'Clear' });
        this.submitButton = page.getByRole('button', { name: 'Send Message' });
        this.feedbackMessage = page.locator('.offset3.span6');
    }

    async fillFeedbackForm(name: string, email: string, subject: string, comment: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.commentInput.fill(comment);
    }

    async resetFeedbackForm() {
        await this.clearButton.click();
    }

    async submitFeedbackForm() {
        await this.submitButton.click();
    }

    async verifyFeedbackFormIsEmpty() {
        await expect(this.nameInput).toBeEmpty();
        await expect(this.emailInput).toBeEmpty();
        await expect(this.subjectInput).toBeEmpty();
        await expect(this.commentInput).toBeEmpty(); 
    }

    async verifyFeedbackSubmission() {
        await expect(this.feedbackMessage).toContainText('Thank you for your comments');
    }

}



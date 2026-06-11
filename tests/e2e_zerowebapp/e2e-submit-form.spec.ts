import { test, expect } from '@playwright/test'
import { Locator } from '@playwright/test'


    test.describe ("Feedback form", () => {

        let nameInput: Locator;
        let emailInput: Locator;
        let subjectInput: Locator;
        let commentInput: Locator;
        let clearButton: Locator;
        let submitButton: Locator;

        test.beforeEach(async ({ page }) => {
            await page.goto('http://zero.webappsecurity.com/index.html');
            await page.click('#feedback');

            nameInput = page.getByRole('textbox', { name: 'Your Name' });
            emailInput = page.getByRole('textbox', { name: 'Your email address' });
            subjectInput = page.getByRole('textbox', { name: 'Subject' });
            commentInput = page.locator('#comment');
            clearButton = page.getByRole('button', { name: 'Clear' });
            submitButton = page.getByRole('button', { name: 'Send Message' });
        })

        // Reset feedback form
        test('Reset feedback form', async ({ page }) => {
            await nameInput.fill('John Doe');
            await emailInput.fill('john.doe@example.com');
            await subjectInput.fill('Feedback Subject');
            await commentInput.fill('This is a feedback comment for testing purposes.');

            await clearButton.click();

            await expect(nameInput).toBeEmpty();
            await expect(emailInput).toBeEmpty();
            await expect(subjectInput).toBeEmpty();
            await expect(commentInput).toBeEmpty(); 
        })


        // Submit feedback form
        test('Submit feedback form', async ({ page }) => {
            
            await nameInput.fill('John Doe');
            await emailInput.fill('john.doe@example.com');
            await subjectInput.fill('Feedback Subject');
            await commentInput.fill('This is a feedback comment for testing purposes.');

            await submitButton.click();

            await expect(page.locator('.offset3.span6')).toContainText('Thank you for your comments');
        })


    })
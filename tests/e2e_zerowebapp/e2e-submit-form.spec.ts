import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage';
import { FeedbackPage } from '../../page-objects/FeedbackPage';


    test.describe.only ("Feedback form", () => {

        let homePage: HomePage;
        let feedbackPage: FeedbackPage;

        test.beforeEach(async ({ page }) => {
            homePage = new HomePage(page);
            feedbackPage = new FeedbackPage(page);

            await homePage.visit();
            await homePage.clickFeedbackLink();
            await page.waitForURL('http://zero.webappsecurity.com/feedback.html');
        })

        // Reset feedback form
        test('Reset feedback form', async ({ page }) => {
            await feedbackPage.fillFeedbackForm('John Doe', 'john.doe@example.com', 'Feedback Subject', 'This is a feedback comment for testing purposes.');
            await feedbackPage.resetFeedbackForm();
            await feedbackPage.verifyFeedbackFormIsEmpty();
        })


        // Submit feedback form
        test('Submit feedback form', async ({ page }) => {
            await feedbackPage.fillFeedbackForm('John Doe', 'john.doe@example.com', 'Feedback Subject', 'This is a feedback comment for testing purposes.');
            await feedbackPage.submitFeedbackForm();
            await feedbackPage.verifyFeedbackSubmission();
        })


    })
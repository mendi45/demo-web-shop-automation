import { LoginPage } from '../pages/login.page';
import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { TestData } from '../consts/selectors';
import { secrets } from '../config/secrets';

// Simple comment: Test for top menu categories

test.describe('Top Menu Categories', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let basePage: BasePage;
    let loginPage: LoginPage;

    test.beforeAll(async ({ browser: testBrowser }) => {
        browser = testBrowser;
        context = await browser.newContext();
        page = await context.newPage();
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);
        await basePage.open(secrets.baseUrl);
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('should display all categories in the top menu', async () => {
        // Get the expected category names from TestData
        const expectedCategories = Object.values(TestData.categories).map(cat => cat.name);

        const actualMenuItems = await loginPage.getTopMenuItemsText();
        expect(actualMenuItems).toEqual(expectedCategories);
    });
}); 
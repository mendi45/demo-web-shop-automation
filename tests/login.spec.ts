import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { LoginPage } from '../pages/login.page';
import { ErrorMessages } from '../consts/errors';
import { Selectors } from '../consts/selectors';
import { secrets } from '../config/secrets';

test.describe('Login Page Tests', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let loginPage: LoginPage;
    let basePage: BasePage;
    const email = 'someemail@gmail.com'; 
    const password = 'somePassword';

    test.beforeAll(async ({ browser: testBrowser }) => {
        browser = testBrowser;
        context = await browser.newContext();
        page = await context.newPage();
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);
        await basePage.open(secrets.baseUrl);
        await loginPage.clickOnHref(loginPage.loginHrefs.login);
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('check if login page is opened', async () => {
        const pageTitle = await basePage.getTitle();
        expect(pageTitle).toBe(Selectors.login.title);
    });

    test('perform login with invalid credentials', async () => {
        await loginPage.preformLogin(email, password);
        const { message, details } = await loginPage.getLoginError();
        expect(message).toContain(ErrorMessages.login.loginWasUnsuccessful);
        expect(details).toContain(ErrorMessages.login.credentialsIncorrect);
    });

    test('perform login with valid credentials', async () => {
        await loginPage.preformLogin(
            secrets.users.admin.email,
            secrets.users.admin.password
        );
        
        const connectedAccount = await loginPage.getConnectedAccount();
        expect(connectedAccount).toBe(secrets.users.admin.email);
    });
});
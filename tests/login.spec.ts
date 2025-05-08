import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { LoginPage } from '../pages/login.page';
import { describe } from 'node:test';

describe('Login Page Tests', () => {
    let loginPage: LoginPage;
    let basePage: BasePage;
    const email = 'someemail@gmail.com'; 
    const password = 'somepassword';

    test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    loginPage = new LoginPage(page);
    await basePage.open('https://demowebshop.tricentis.com/login');
    });

    test('check if login page is opened', async () => {
        const pageTitle = await basePage.getTitle();
        expect(pageTitle).toBe('Demo Web Shop. Login');
    });

    test('check if remember me checkbox is checked', async () => {
        const isChecked = await loginPage.getRememberMeCheckboxState();
        expect(isChecked).toBe(false);
    });

    test('preforme login with valid credentials', async () => {
        await loginPage.login(email, password);
        // Add your assertions here to verify successful login
    });
});
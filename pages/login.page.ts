import { secrets } from '../config/secrets';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
    inputsArea: Locator;
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    rememberMeCheckbox: Locator;
    returningCustomerWrapper: Locator;
    headerLinks: Locator;
    loginErrorMessage: Locator;
    connectedAccount: Locator;
    headerLinksWrapper: Locator;

    loginHrefs = {
        login: '/login',
        register: '/register',
        myAccount: '/customer/info',
        logout: '/logout'
    };

    constructor(public page: Page) {
        super(page);
        this.returningCustomerWrapper = this.page.locator('.returning-wrapper');
        this.inputsArea = this.returningCustomerWrapper.locator('.form-fields .inputs');
        this.emailInput = this.inputsArea.locator('.email');
        this.passwordInput = this.inputsArea.locator('.password');  
        this.loginButton = this.returningCustomerWrapper.locator('input.button-1.login-button');
        this.rememberMeCheckbox = this.page.getByTestId('RememberMe');
        this.loginErrorMessage = this.page.locator('.validation-summary-errors');
        this.headerLinks = this.page.locator('.header-links');
        this.connectedAccount = this.headerLinks.locator('.account');
        this.headerLinksWrapper = this.page.locator('.header-links-wrapper');
    }
    
    async preformLogin(email: string, password: string): Promise<void> {
        await this.fillText(this.emailInput, email);
        await this.fillText(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }

    async getRememberMeCheckboxState(): Promise<boolean> {
        const isChecked = await this.rememberMeCheckbox.isChecked();
        return isChecked;
    }

    async getConnectedAccount(): Promise<string> {
        const connectedAccountText = await this.connectedAccount.textContent();
        return connectedAccountText || '';
    }

    async getLoginError(): Promise<{ message: string; details: string[] }> {
        const errorMessageText = await this.loginErrorMessage.innerText();
        const errorList = await this.loginErrorMessage.locator('ul li').allTextContents();
        return {
            message: errorMessageText.trim(),
            details: errorList
        };
    }

    async clickOnHref(href: string): Promise<void> {
        await this.clickElement(this.headerLinksWrapper.locator(`a[href="${href}"]`));
    }


    /**
     * Get the text of all top menu items (trimmed, top-level only)
     */
    async getTopMenuItemsText(): Promise<string[]> {
        const items = this.page.locator('.top-menu > li');
        const count = await this.countElements(items);
        const texts: string[] = [];
        
        for (let i = 0; i < count; i++) {
            const anchor = items.nth(i).locator('a').first();
            const text = (await this.getText(anchor))?.trim();
            if (text) texts.push(text);
        }
        return texts;
    }
}
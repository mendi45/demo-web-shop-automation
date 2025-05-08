import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
    inputsArea: Locator;
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    rememberMeCheckbox: Locator;
    returningCustomerWrapper: Locator;

    constructor(public page: Page) {
        super(page);
        this.returningCustomerWrapper = this.page.locator('.returning-wrapper');
        this.inputsArea = this.returningCustomerWrapper.locator('.form-fields .inputs');
        this.emailInput = this.inputsArea.locator('.email');
        this.passwordInput = this.inputsArea.locator('.password');  
        this.loginButton = this.returningCustomerWrapper.locator('input.button-1.login-button');
        this.rememberMeCheckbox = this.page.getByRole('checkbox', { name: 'RememberMe' });
    }
    
    async login(email: string, password: string): Promise<void> {
        await this.fillText(this.emailInput, email);
        await this.fillText(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }

    async getRememberMeCheckboxState(): Promise<boolean> {
        const isChecked = await this.rememberMeCheckbox.isChecked();
        return isChecked;
    }
}
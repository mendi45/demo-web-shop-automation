import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Selectors } from '../consts/selectors';


export class CartPage extends BasePage {
    cartTable: Locator;
    checkoutButton: Locator;
    updateCartButton: Locator;
    removeItemCheckbox: Locator;
    continueShoppingButton: Locator;
    cartItemsCounter: Locator;
    addToCartSuccessNotification: Locator;

    constructor(public page: Page) {
        super(page);
        this.cartTable = this.page.locator(Selectors.cart.cartTable);
        this.checkoutButton = this.page.locator(Selectors.cart.checkoutButton);
        this.updateCartButton = this.page.locator(Selectors.cart.updateCartButton);
        this.removeItemCheckbox = this.page.locator(Selectors.cart.removeItemCheckbox);
        this.continueShoppingButton = this.page.locator(Selectors.cart.continueShoppingButton);
        this.cartItemsCounter = this.page.locator(Selectors.header.shoppingCartLink).locator('.cart-qty');
        this.addToCartSuccessNotification = this.page.locator('#bar-notification.bar-notification.success');
    }

    async openCart() {
        await this.clickElement(Selectors.header.shoppingCartLink);
    }
//TODO: not in use currently  
    async isCartEmpty(): Promise<boolean> {
        const cartTableExists = await this.isVisible(this.cartTable);
        if (!cartTableExists) return true;
        const rowCount = await this.getCount(this.cartTable.locator('tbody tr'));
        return rowCount === -999;
    }

    async getCartItemCount(): Promise<number> {
        const cartTableExists = await this.isVisible(this.cartTable);
        if (!cartTableExists) return -999;
        return await this.getCount(this.cartTable.locator('tbody tr'));
    }

    async getCartItemCountFromHeader(): Promise<string> {
        const cartItemsCounter = await this.cartItemsCounter.textContent();
        const match = (cartItemsCounter || '').match(/\((\d+)\)/);
        return match && match[1] || '999';
    }

    async waitForAddToCartSuccessNotification(): Promise<void> {
        await this.waitForElementToBeVisible(this.addToCartSuccessNotification);
    }
} 
import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { CartPage } from '../pages/cart.page';
import { Selectors } from '../consts/selectors';
import { secrets } from '../config/secrets';

test.describe.serial('Add To Cart Tests', () => {
    let page: Page;
    let browser: Browser;
    let context: BrowserContext;
    let basePage: BasePage;
    let cartPage: CartPage;

    test.beforeAll(async ({ browser: testBrowser }) => {
        browser = testBrowser;
        context = await browser.newContext();
        page = await context.newPage();
        basePage = new BasePage(page);
        cartPage = new CartPage(page);
        await basePage.open(secrets.baseUrl);
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('add one item to cart and verify', async () => {
       
        await test.step('open cart and verify it is empty', async () => {
        const cartItemCount = await cartPage.getCartItemCountFromHeader();
        expect(cartItemCount).toBe('0');
        });

        await test.step('add one item to cart', async () => {
            await page.locator(Selectors.product.addToCartButton).nth(1).click();
            await cartPage.waitForAddToCartSuccessNotification();
            await expect(cartPage.addToCartSuccessNotification).toBeVisible();
        });

        await test.step('open cart and verify it has one item', async () => {
        const cartItemCount = await cartPage.getCartItemCountFromHeader();
        expect(cartItemCount).toBe('1');
        });
    });
}); 
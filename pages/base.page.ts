import { Locator, Page } from '@playwright/test';

export class BasePage {
    dialogRole: Locator;

    constructor(public page: Page) {
        this.page = page;
    }

    async open(path: string) {
        await this.page.goto(path);
    }

    async getTitle() {
        return await this.page.title();
    }

    async getUrl() {
        return this.page.url();
    }

    private async getTypeOfLocator(locator: (string | Locator)) {
        const locatorElement = locator as Locator
        if (typeof locator === 'string') {
            return this.page.locator(locator)
        } else if (locator === locatorElement) {
            return locator;
        } else {
            throw new Error(`type of locator: ${locator} must be a of type string or Locator`)
        }
    }

    async clearText(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        await locatorElement.clear();
    }

    async fillText(locator: (string | Locator), text: string) {
        const locatorElement = await this.getTypeOfLocator(locator);
        await locatorElement.click()
        await locatorElement.fill(text)
    }

    async typeTextSequentially(element: Locator, text: string) {
        await this.clickElement(element);
        await element.pressSequentially(text);
    }
    async pressKey(locator: (string | Locator), key: string) {
        const locatorElement = await this.getTypeOfLocator(locator);
        await locatorElement.press(key);
    }

    async clickElement(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        await locatorElement.click();
    }
    async doubleClickElement(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        await locatorElement.dblclick();
    }
    async rightClickElement(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        await locatorElement.click({ button: 'right' });
    }
    async selectOption(locator: (string | Locator), option: string) {
        const locatorElement = await this.getTypeOfLocator(locator);
        await locatorElement.selectOption(option);
    }


    async getText(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        return await locatorElement.textContent();
    }

    async getLocatorInnerText(locator: Locator) {
        if (await locator.evaluate(element => element.tagName.toLowerCase() === 'input')) {
            return ((await locator.inputValue()).trim());
        } else {
            return ((await locator.innerText()).trim());
        }
    }

    async clickAndChooseFromDropdownByText(
        dropdownLocator: Locator,
        dropdownList: Locator,
        dropdownItemTextOrIndex: string | number,
        exact: boolean = true
    ) {
        await this.clickElement(dropdownLocator);
        if (typeof dropdownItemTextOrIndex === 'number') {
            const itemIndex = dropdownList.nth(dropdownItemTextOrIndex);
            await this.clickElement(itemIndex);

        } else if (typeof dropdownItemTextOrIndex === 'string') {
            const dropdownItem = dropdownList.getByText(dropdownItemTextOrIndex, { exact })
            await this.clickElement(dropdownItem);

        } else {
            throw new Error([
                `The item with the given text or index: ${dropdownItemTextOrIndex}`,
                `does not exist in the dropdown list`,
            ].join(' '));
        }
    }

    async clickAndChooseMultipleValuesFromDropdownByText(
        dropdownLocator: Locator,
        dropdownList: Locator,
        dropdownValues: string | string[],
        exact: boolean = true
    ) {
        const dropdownTextValues = Array.isArray(dropdownValues)
            ? dropdownValues
            : [dropdownValues];

        try {
            await this.clickElement(dropdownLocator);
            let valueSet = new Set(dropdownTextValues);

            for (let i = 0; i < dropdownTextValues.length; i++) {
                const dropdownValue = dropdownTextValues[i];
                const dropdownItemText = dropdownList.getByText(dropdownValue, { exact });

                if (valueSet.has(dropdownValue)) {
                    await this.clickElement(dropdownItemText);
                }
            }
        } catch (error) {
            throw new Error([
                `One of the items: [ "${dropdownTextValues.join(', ')}" ]`,
                `does not exist in the dropdown list`,
            ].join(' '));
        }
    }

    async countElements(element: Locator) {
        const elementCount = await element.count();
        if (elementCount > 1) {
            await Promise.all(
                Array.from({ length: elementCount }, (_, index) =>
                    this.waitForElementToBeVisible(element.nth(index))
                )
            )
        }
        return elementCount;
    }

    async closeDialog() {
        const dialog = this.dialogRole;
        const dialogSvgTagXButton = dialog.locator('.close-btn');
        if (await dialogSvgTagXButton.count() > 0) {
            await dialogSvgTagXButton.click();
            return;
        }
        const dialogGsIconCloseButton = dialog.locator('.close-button');
        if (await dialogGsIconCloseButton.count() > 0) {
            await dialogGsIconCloseButton.click();
            return;
        }
        throw new Error('No close button found to close the dialog');
    }

    async clickOnTab(tabName: string) {
        await this.page.getByRole('tab').filter({ hasText: tabName }).click();
    }

    /**
     * this function can be applied to both checkboxes and radio buttons with the following elements:
     * input[type=checkbox], input[type=radio] and [role=checkbox] elements.
     */
    async changeCheckboxState(checkboxLocator: Locator) {
        let isCheckboxChecked = await checkboxLocator.isChecked();
        if (!isCheckboxChecked) {
            await checkboxLocator.check();
        } else {
            await checkboxLocator.uncheck();
        }
    }
    async clickOnButton(button: Locator) {
        await button.click();
    }

    async isButtonDisabled(buttonText: string) {
        return await this.page.locator('button', { hasText: buttonText }).isDisabled();
    }

    async isButtonEnabled(button: Locator) {
        return await button.isEnabled();
    }

    async clickOnButtonByText(buttonText: string) {
        await this.page.locator('button').getByText(buttonText).click();
    }

    async getAttribute(locator: (string | Locator), attribute: string) {
        const locatorElement = await this.getTypeOfLocator(locator);
        return await locatorElement.getAttribute(attribute);
    }
    async isVisible(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        return await locatorElement.isVisible();
    }
    async isHidden(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        return await locatorElement.isHidden();
    }
    async isChecked(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        return await locatorElement.isChecked();
    }
    async isDisabled(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        return await locatorElement.isDisabled();
    }
    async isEnabled(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        return await locatorElement.isEnabled();
    }
    async getCount(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        return await locatorElement.count();
    }
    async getNthElement(locator: (string | Locator), index: number) {
        const locatorElement = await this.getTypeOfLocator(locator);
        return locatorElement.nth(index);
    }
    async getNthText(locator: (string | Locator), index: number) {
        const locatorElement = await this.getTypeOfLocator(locator);
        return await locatorElement.nth(index).textContent();
    }
    async getNthAttribute(locator: (string | Locator), index: number, attribute: string) {
        const locatorElement = await this.getTypeOfLocator(locator);
        return await locatorElement.nth(index).getAttribute(attribute);
    }
    async hover(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        await locatorElement.hover();
    }
    async waitForElement(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        await locatorElement.waitFor();
    }
    async waitForElementToBeVisible(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        await locatorElement.waitFor({ state: 'visible' });
    }
    async waitForElementToBeHidden(locator: (string | Locator)) {
        const locatorElement = await this.getTypeOfLocator(locator);
        await locatorElement.waitFor({ state: 'hidden' });
    }

    async unfocusSelectBox() {
        await this.page.locator('.body').click({ force: true, position: { x: 200, y: 100 } });
    }

    async unfocusPopups(position = { x: 50, y: 100 }) {
        await this.page.locator('.cdk-overlay-backdrop').click({ force: true, position });
    }

    async changeCheckBoxState(locator: (string | Locator)) {
        const checkBox = await this.getTypeOfLocator(locator)
        const isChecked = await checkBox.isChecked();
        if (!isChecked) {
            await checkBox.check();
        } else {
            await checkBox.uncheck();
        }
    }

    async refreshPage() {
        await this.page.reload();
    }

    async closePage() {
        await this.page.close();
    }
    async goBack() {
        await this.page.goBack();
    }
    async goForward() {
        await this.page.goForward();
    }
    async waitForTimeout(timeout: number) {
        await this.page.waitForTimeout(timeout);
    }



}
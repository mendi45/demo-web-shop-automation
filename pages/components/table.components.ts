import { Locator } from '@playwright/test';
import { Page } from '@playwright/test';

export class TableComponent {
  private rowsSelector = 'tbody tr';
  private pageTableContainer: Page | Locator;
  private table: Locator;
  private tableColumnCells: Locator;
  private rows: Locator;

  constructor(
    private page: Page,
    private pageTableSelector?: string,
    private tableSelector = 'table.mat-table',
    private columnsCellsSelector = 'td.mat-cell'
  ) {
    this.pageTableContainer = this.pageTableSelector ?
      this.page.locator(this.pageTableSelector) :
      this.page;
    this.table = this.pageTableContainer.locator(this.tableSelector);
    this.tableColumnCells = this.pageTableContainer.locator(this.columnsCellsSelector);
    this.rows = this.table.locator(this.rowsSelector);
  }

  getColumnLocatorByText(cellText: string, exact = false) {
    return this.tableColumnCells.getByText(cellText, { exact });
  }

  getColumnLocatorByClassName(className: string) {
    return this.table.locator(`tbody .${ className }`);
  }

  async isCellTextExistInTable(cellText: string, timeout = 45000, exact = false) {
    try {
      await this.getColumnLocatorByText(cellText, exact).click({ trial: true, timeout });

      return true;
    } catch (error) {
      console.log(`cell with text ${ cellText } not found`);

      return false;
    }
  }

  async clickOnRowByRowIndex(index = 0) {
    await this.table.locator('tbody tr').nth(index).click();
  }

  async waitForSearchToFinishWithOnlyOneResult() {
    let tableRowsSelector = this.pageTableSelector ? `${ this.pageTableSelector } ` : '';
    tableRowsSelector += this.tableSelector ? `${ this.tableSelector } ` : '';
    tableRowsSelector += `${ this.rowsSelector }`;
    await this.page.waitForFunction((rows) => {
      return Array.from(document.querySelectorAll(rows)).length === 1;
    }, tableRowsSelector);
  }

  async waitForSearchToFinishWithOneOrMoreResults() {
    let tableRowsSelector = this.pageTableSelector ? `${ this.pageTableSelector } ` : '';
    tableRowsSelector += this.tableSelector ? `${ this.tableSelector } ` : '';
    tableRowsSelector += `${ this.rowsSelector }`;
    await this.page.waitForFunction((rows) => {
      return Array.from(document.querySelectorAll(rows)).length >= 1;
    }, tableRowsSelector);
  }

  /**
   * @description gets the column index dynamically by the column name
   * @param tableLocator
   * @param columnName
   * @returns
   */
  async getColumnIndexByName(tableLocator: Locator, columnName: string) {
    const tableColumns = await tableLocator.locator('thead th').all();
    for (let i = 0; i < tableColumns.length; i++) {
      const columnInnerText = (await tableColumns[i].innerText()).trim();
      if (columnInnerText === columnName) {
        return i;
      }
    }
    throw new Error(`column: ${ columnName } does not exist on target table`);
  }
  /**
   * @description gets a specific cell value on a specific row under a specific column
   */
  public async getTableCellValue(tableLocator: Locator, rowText: string, column: string) {
    const tableRow = tableLocator.locator('tbody tr', { hasText: rowText });
    const tableColumn = await this.getColumnIndexByName(tableLocator, column);
    const tableCell = tableRow.locator('td').nth(tableColumn);
    const cellInnerText = (await tableCell.innerText()).trim();

    return cellInnerText;
  }

  async getTableCellValueByRowIndex(tableLocator: Locator, rowIndex: number, column: string) {
    const tableRow = tableLocator.locator('tbody tr').nth(rowIndex);
    const tableColumn = await this.getColumnIndexByName(tableLocator, column);
    const tableCell = tableRow.locator('td').nth(tableColumn);
    const cellInnerText = (await tableCell.innerText()).trim();

    return cellInnerText;
  }

  async countTableRows(tableLocator: Locator) {
    const tableRow = tableLocator.locator('tbody tr');
    const tableRowsCount = await tableRow.count();

    return tableRowsCount;
  }

  async clickOnTableCellValue(tableLocator: Locator, rowText: string, cellText?: string, clickForce: boolean = false) {
    const tableRow = tableLocator.locator('tbody tr', { hasText: rowText });
    const targetCellText = cellText || rowText;
    const tableCell = tableRow.locator('td', { hasText: targetCellText });
    if (clickForce) {
      await tableCell.click({ force: true });
    } else {
      await tableCell.click();
    }
  }

  async getTableRowWithText(tableLocator: Locator, rowText: string) {
    const tableRow = tableLocator.locator('tbody tr', { hasText: rowText });

    return tableRow;
  }

  async getTableRowByIndex(tableLocator: Locator, index: number) {
    const tableRow = tableLocator.locator('tbody tr').nth(index);

    return tableRow;
  }

  async clickOnTargetButtonFromTableRow<T>(tableLocator: Locator, tableRowIdentifier: T, tableButton: Locator) {
    let tableRow: Locator | undefined;

    if (typeof tableRowIdentifier !== 'string' && typeof tableRowIdentifier !== 'number') {
      throw new Error(`the table row identifier ${ tableRowIdentifier } must be of type string or number`);
    }

    if (typeof tableRowIdentifier === 'string') {
      tableRow = await this.getTableRowWithText(tableLocator, tableRowIdentifier);
    }

    if (typeof tableRowIdentifier === 'number') {
      tableRow = await this.getTableRowByIndex(tableLocator, tableRowIdentifier);
    }

    if (!tableRow) {
      throw new Error('Table row was not found');
    }

    const tableRowButton = tableRow.locator(tableButton);
    await tableRowButton.click();
  }

  async getCellValuesDynamicallyFromAllTableRows(
    tableLocator: Locator,
    columnName: string
  ) {
    const cellValues: string[] = [];
    const tableRow = await tableLocator.locator('tbody tr').all();
    const tableColumn = await this.getColumnIndexByName(tableLocator, columnName);
    for (const row of tableRow) {
      const tableCell = row.locator('td').nth(tableColumn);
      const cellInnerText = (await tableCell.innerText()).trim();
      cellValues.push(cellInnerText);
    }

    return cellValues;
  }
}

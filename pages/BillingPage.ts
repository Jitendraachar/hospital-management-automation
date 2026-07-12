import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { getBaseUrl } from '../helpers/env';

export class BillingPage extends BasePage {
  private readonly newButton: Locator;
  private readonly searchInput: Locator;
  private readonly saveButton: Locator;
  private readonly discardButton: Locator;

  private readonly createInvoiceButton: Locator;
  private readonly reloadFromPatientButton: Locator;
  private readonly printInvoiceButton: Locator;

  private readonly patientCombobox: Locator;
  private readonly ipdReferenceCombobox: Locator;
  private readonly addLineButton: Locator;

  private readonly billNumberHeader: Locator;
  private readonly patientHeader: Locator;
  private readonly totalAmountHeader: Locator;
  private readonly statusHeader: Locator;

  private readonly firstBillCell: Locator;
  private readonly statusBar: Locator;
  private readonly invoiceTotalLabel: Locator;
  private readonly amountPaidLabel: Locator;
  private readonly amountDueLabel: Locator;
  private readonly totalAmountLabel: Locator;
  private readonly billingLinesTab: Locator;
  private readonly notesTab: Locator;
  private readonly billingListTitle: Locator;
  private readonly billingFormTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.newButton = page.getByRole('button', { name: 'New' }).first();
    this.searchInput = page.getByRole('searchbox', { name: 'Search...' });
    this.saveButton = page.getByRole('button', { name: 'Save manually' });
    this.discardButton = page.getByRole('button', { name: 'Discard all changes' });

    this.createInvoiceButton = page.getByRole('button', { name: 'Create Invoice' });
    this.reloadFromPatientButton = page.getByRole('button', { name: '↻ Reload from Patient' });
    this.printInvoiceButton = page.getByRole('button', { name: '🖨 Print Invoice' });

    this.patientCombobox = page.getByRole('combobox', { name: 'Patient' });
    this.ipdReferenceCombobox = page.getByRole('combobox', { name: 'IPD Reference' });
    this.addLineButton = page.getByRole('button', { name: 'Add a line' });

    this.billNumberHeader = page.getByRole('columnheader', { name: /Bill Number/i });
    this.patientHeader = page.getByRole('columnheader', { name: /^Patient/ });
    this.totalAmountHeader = page.getByRole('columnheader', { name: /Total Amount/i });
    this.statusHeader = page.getByRole('columnheader', { name: /^Status/ });

    this.firstBillCell = page.getByRole('cell', { name: /^BILL\// }).first();
    this.statusBar = page.getByRole('radiogroup', { name: /Statusbar/i });
    this.invoiceTotalLabel = page.getByText('Invoice Total', { exact: true });
    this.amountPaidLabel = page.getByText('Amount Paid', { exact: true });
    this.amountDueLabel = page.getByText('Amount Due', { exact: true });
    this.totalAmountLabel = page.getByText('Total Amount', { exact: true });
    this.billingLinesTab = page.getByRole('tab', { name: 'Billing Lines' });
    this.notesTab = page.getByRole('tab', { name: 'Notes' });
    this.billingListTitle = page.getByText(/^Billing$/).first();
    this.billingFormTitle = page.getByText(/^New$/).first();
  }

  async openList(): Promise<void> {
    const url = new URL('/odoo/action-372/action-383', getBaseUrl()).toString();
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await this.ensureBillingListLoaded();
  }

  async openNewForm(): Promise<void> {
    await this.openList();
    await this.clickNew();
  }

  async ensureBillingListLoaded(): Promise<void> {
    await expect(this.newButton).toBeVisible({ timeout: 15000 });
    await expect(this.billNumberHeader).toBeVisible();
    await expect(this.patientHeader).toBeVisible();
    await expect(this.totalAmountHeader).toBeVisible();
    await expect(this.statusHeader).toBeVisible();
  }

  async ensureBillingFormLoaded(): Promise<void> {
    await expect(this.patientCombobox).toBeVisible({ timeout: 15000 });
    await expect(this.billingLinesTab).toBeVisible();
  }

  async clickNew(): Promise<void> {
    await this.click(this.newButton);
    await this.ensureBillingFormLoaded();
  }

  async search(term: string): Promise<void> {
    await this.fill(this.searchInput, term);
  }

  async openFirstBillFromList(): Promise<void> {
    const billCells = this.page.getByRole('cell', { name: /^BILL\// });
    const billCount = await billCells.count();

    for (let index = 0; index < billCount; index++) {
      const billCell = billCells.nth(index);

      if (!(await billCell.isVisible())) {
        continue;
      }

      await billCell.dblclick();
      await this.ensureBillingFormLoaded();

      if (await this.createInvoiceButton.isVisible()) {
        return;
      }

      const backToBillingButton = this.page.getByRole('button', { name: /Back to Billing/i }).first();
      if (await backToBillingButton.isVisible()) {
        await backToBillingButton.click();
      } else {
        const billingBreadcrumb = this.page.getByRole('link', { name: 'Billing' }).first();
        await this.click(billingBreadcrumb);
      }

      await this.ensureBillingListLoaded();
    }

    await this.openNewForm();
  }

  async openBillByNumber(billNumber: string): Promise<void> {
    const billCell = this.page.getByRole('cell', { name: new RegExp(`^${billNumber}$`, 'i') });
    await expect(billCell).toBeVisible();
    await billCell.dblclick();
    await this.ensureBillingFormLoaded();
  }

  async selectPatient(patientName: string): Promise<void> {
    await this.click(this.patientCombobox);
    await this.fill(this.patientCombobox, patientName);
    await this.page.keyboard.press('Enter');
  }

  async selectIpdReference(reference: string): Promise<void> {
    await this.click(this.ipdReferenceCombobox);
    await this.fill(this.ipdReferenceCombobox, reference);
    await this.page.keyboard.press('Enter');
  }

  async addBillingLine(): Promise<void> {
    await this.click(this.addLineButton);
  }

  private getFirstEditableLineRow(): Locator {
    return this.page
      .getByRole('row')
      .filter({ has: this.page.getByRole('button', { name: 'Delete row' }) })
      .first();
  }

  async fillOrUpdateFirstLine(serviceName: string, description: string, quantity: string, unitPrice: string): Promise<void> {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        if ((await this.page.getByRole('button', { name: 'Delete row' }).count()) === 0) {
          await this.addBillingLine();
        }

        const row = this.getFirstEditableLineRow();

        const serviceCell = row.getByRole('cell').nth(1);
        await this.click(serviceCell);
        const serviceInput = serviceCell.getByRole('combobox').first();
        await serviceInput.fill(serviceName);
        await this.page.keyboard.press('Enter');

        const descriptionCell = row.getByRole('cell').nth(2);
        await this.click(descriptionCell);
        const descriptionInput = descriptionCell.getByRole('textbox').first();
        await expect(descriptionInput).toBeVisible();
        await descriptionInput.fill(description);

        const quantityCell = row.getByRole('cell').nth(3);
        await this.click(quantityCell);
        const quantityInput = quantityCell.getByRole('textbox').first();
        await expect(quantityInput).toBeVisible();
        await quantityInput.fill(quantity);

        const unitPriceCell = row.getByRole('cell').nth(4);
        await this.click(unitPriceCell);
        const unitPriceInput = unitPriceCell.getByRole('textbox').first();
        await expect(unitPriceInput).toBeVisible();
        await unitPriceInput.fill(unitPrice);

        await this.page.keyboard.press('Tab');
        return;
      } catch (error) {
        if (attempt === 2) {
          throw error;
        }
        await this.page.keyboard.press('Escape').catch(() => undefined);
      }
    }
  }

  async getFirstLineSnapshot(): Promise<{ description: string; quantity: string; unitPrice: string; subtotal: string }> {
    const row = this.getFirstEditableLineRow();

    const description = (await row.getByRole('cell').nth(2).textContent())?.trim() ?? '';
    const quantity = (await row.getByRole('cell').nth(3).textContent())?.trim() ?? '';
    const unitPrice = (await row.getByRole('cell').nth(4).textContent())?.trim() ?? '';
    const subtotal = (await row.getByRole('cell').nth(5).textContent())?.trim() ?? '';

    return { description, quantity, unitPrice, subtotal };
  }

  async getCurrentBillNumber(): Promise<string> {
    const billText = await this.page.getByText(/^BILL\/\d+$/).first().textContent();
    return (billText ?? '').trim();
  }

  async getFirstBillNumberFromList(): Promise<string> {
    await this.ensureBillingListLoaded();
    const firstBill = (await this.page.getByRole('cell', { name: /^BILL\// }).first().textContent()) ?? '';
    return firstBill.trim();
  }

  async getVisibleBillNumbers(): Promise<string[]> {
    await this.ensureBillingListLoaded();
    await expect(this.firstBillCell).toBeVisible({ timeout: 15000 });

    const billCells = this.page.getByRole('cell', { name: /^BILL\// });
    const count = await billCells.count();
    const values: string[] = [];

    for (let index = 0; index < count; index++) {
      const text = (await billCells.nth(index).textContent())?.trim() ?? '';
      if (text && !values.includes(text)) {
        values.push(text);
      }
    }

    return values;
  }

  async getSelectedPatientName(): Promise<string> {
    const value = (await this.patientCombobox.textContent()) ?? '';
    return value.trim();
  }

  async clickCreateInvoice(): Promise<void> {
    await this.click(this.createInvoiceButton);
  }

  async save(): Promise<void> {
    await this.click(this.saveButton);
  }

  async discard(): Promise<void> {
    await this.click(this.discardButton);
  }

  async deleteCurrentBill(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await this.click(this.page.getByRole('button', { name: 'Actions menu' }).first());

    const deleteMenuItem = this.page.getByRole('menuitem', { name: /^Delete$/i }).first();
    const deleteButton = this.page.getByRole('button', { name: /^Delete$/i }).first();

    if (await deleteMenuItem.isVisible()) {
      await deleteMenuItem.click();
    } else if (await deleteButton.isVisible()) {
      await deleteButton.click();
    }

    const confirmDelete = this.page.getByRole('button', { name: /Delete|Ok|Confirm/i }).first();
    if (await confirmDelete.isVisible()) {
      await confirmDelete.click();
    }
  }

  async isBillVisibleInList(billNumber: string): Promise<boolean> {
    await this.search(billNumber);
    return await this.getRowByText(billNumber).first().isVisible();
  }

  async verifySummarySection(): Promise<void> {
    await expect(this.invoiceTotalLabel).toBeVisible();
    await expect(this.amountPaidLabel).toBeVisible();
    await expect(this.amountDueLabel).toBeVisible();
    await expect(this.totalAmountLabel).toBeVisible();
  }

  async verifyInvoiceActionButtons(): Promise<void> {
    await expect(this.createInvoiceButton).toBeVisible();
    await expect(this.reloadFromPatientButton).toBeVisible();
    await expect(this.printInvoiceButton).toBeVisible();
  }

  async verifyRefundPrerequisites(): Promise<void> {
    await this.verifyInvoiceActionButtons();
    await expect(this.billingLinesTab).toBeVisible();
    await expect(this.notesTab).toBeVisible();
    await expect(this.addLineButton).toBeVisible();
  }

  async verifyStatusFlowVisible(): Promise<void> {
    await expect(this.statusBar).toBeVisible();
    await expect(this.statusBar.getByText(/Draft|Invoiced|Partially Paid|Paid/i).first()).toBeVisible();
  }

  getNewButton(): Locator {
    return this.newButton;
  }

  getSearchInput(): Locator {
    return this.searchInput;
  }

  getSaveButton(): Locator {
    return this.saveButton;
  }

  getDiscardButton(): Locator {
    return this.discardButton;
  }

  getCreateInvoiceButton(): Locator {
    return this.createInvoiceButton;
  }

  getReloadFromPatientButton(): Locator {
    return this.reloadFromPatientButton;
  }

  getPrintInvoiceButton(): Locator {
    return this.printInvoiceButton;
  }

  getPatientCombobox(): Locator {
    return this.patientCombobox;
  }

  getIpdReferenceCombobox(): Locator {
    return this.ipdReferenceCombobox;
  }

  getAddLineButton(): Locator {
    return this.addLineButton;
  }

  getBillNumberHeader(): Locator {
    return this.billNumberHeader;
  }

  getPatientHeader(): Locator {
    return this.patientHeader;
  }

  getTotalAmountHeader(): Locator {
    return this.totalAmountHeader;
  }

  getStatusHeader(): Locator {
    return this.statusHeader;
  }

  getBillingListTitle(): Locator {
    return this.billingListTitle;
  }

  getBillingFormTitle(): Locator {
    return this.billingFormTitle;
  }

  getRowByText(text: string): Locator {
    return this.page.getByRole('row', { name: new RegExp(text, 'i') });
  }
}

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
    await this.navigate(url);
    await this.ensureBillingListLoaded();
  }

  async openNewForm(): Promise<void> {
    const url = new URL('/odoo/action-372/action-383/new', getBaseUrl()).toString();
    await this.navigate(url);
    await this.ensureBillingFormLoaded();
  }

  async ensureBillingListLoaded(): Promise<void> {
    await expect(this.newButton).toBeVisible({ timeout: 15000 });
    await expect(this.billNumberHeader).toBeVisible();
    await expect(this.patientHeader).toBeVisible();
    await expect(this.totalAmountHeader).toBeVisible();
    await expect(this.statusHeader).toBeVisible();
  }

  async ensureBillingFormLoaded(): Promise<void> {
    await expect(this.createInvoiceButton).toBeVisible({ timeout: 15000 });
    await expect(this.patientCombobox).toBeVisible();
    await expect(this.billingLinesTab).toBeVisible();
  }

  async clickNew(): Promise<void> {
    await this.click(this.newButton);
    await this.ensureBillingFormLoaded();
  }

  async search(term: string): Promise<void> {
    await this.fill(this.searchInput, term);
    await this.page.keyboard.press('Enter');
  }

  async openFirstBillFromList(): Promise<void> {
    await expect(this.firstBillCell).toBeVisible();
    await this.click(this.firstBillCell);
    await this.ensureBillingFormLoaded();
  }

  async openBillByNumber(billNumber: string): Promise<void> {
    const billCell = this.page.getByRole('cell', { name: new RegExp(`^${billNumber}$`, 'i') });
    await expect(billCell).toBeVisible();
    await this.click(billCell);
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

  async clickCreateInvoice(): Promise<void> {
    await this.click(this.createInvoiceButton);
  }

  async save(): Promise<void> {
    await this.click(this.saveButton);
  }

  async discard(): Promise<void> {
    await this.click(this.discardButton);
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

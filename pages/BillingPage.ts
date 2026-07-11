import { Locator, Page } from '@playwright/test';
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
    }

    async openList(): Promise<void> {
        const url = new URL('/odoo/action-383', getBaseUrl()).toString();
        await this.navigate(url);
    }

    async openNewForm(): Promise<void> {
        const url = new URL('/odoo/action-383/new', getBaseUrl()).toString();
        await this.navigate(url);
    }

    async clickNew(): Promise<void> {
        await this.click(this.newButton);
    }

    async search(term: string): Promise<void> {
        await this.fill(this.searchInput, term);
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

    async save(): Promise<void> {
        await this.click(this.saveButton);
    }

    async discard(): Promise<void> {
        await this.click(this.discardButton);
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

    getRowByText(text: string): Locator {
        return this.page.getByRole('row', { name: new RegExp(text, 'i') });
    }
}

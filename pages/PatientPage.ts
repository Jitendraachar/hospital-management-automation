import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { getBaseUrl } from '../helpers/env';

export class PatientPage extends BasePage {
    private readonly newButton: Locator;
    private readonly searchInput: Locator;
    private readonly saveButton: Locator;
    private readonly discardButton: Locator;

    private readonly patientNameInput: Locator;
    private readonly phoneInput: Locator;
    private readonly emailInput: Locator;
    private readonly addressInput: Locator;

    private readonly patientUhidHeader: Locator;
    private readonly patientNameHeader: Locator;
    private readonly patientPhoneHeader: Locator;
    private readonly patientEmailHeader: Locator;

    constructor(page: Page) {
        super(page);

        this.newButton = page.getByRole('button', { name: 'New' }).first();
        this.searchInput = page.getByRole('searchbox', { name: 'Search...' });
        this.saveButton = page.getByRole('button', { name: 'Save manually' });
        this.discardButton = page.getByRole('button', { name: 'Discard all changes' });

        this.patientNameInput = page.getByRole('textbox', { name: 'Patient Name' });
        this.phoneInput = page.getByRole('textbox', { name: 'Phone' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.addressInput = page.getByRole('textbox', { name: 'Address' });

        this.patientUhidHeader = page.getByRole('columnheader', { name: /Patient UHID/i });
        this.patientNameHeader = page.getByRole('columnheader', { name: /^Name/ });
        this.patientPhoneHeader = page.getByRole('columnheader', { name: /^Phone/ });
        this.patientEmailHeader = page.getByRole('columnheader', { name: /^Email/ });
    }

    async openList(): Promise<void> {
        const url = new URL('/odoo/action-372/action-374', getBaseUrl()).toString();
        await this.navigate(url);
    }

    async openNewForm(): Promise<void> {
        const url = new URL('/odoo/action-372/action-374/new', getBaseUrl()).toString();
        await this.navigate(url);
    }

    async clickNew(): Promise<void> {
        await this.click(this.newButton);
    }

    async search(term: string): Promise<void> {
        await this.fill(this.searchInput, term);
    }

    async fillPatientForm(data: {
        name: string;
        phone?: string;
        email?: string;
        address?: string;
    }): Promise<void> {
        await this.fill(this.patientNameInput, data.name);

        if (data.phone !== undefined) {
            await this.fill(this.phoneInput, data.phone);
        }

        if (data.email !== undefined) {
            await this.fill(this.emailInput, data.email);
        }

        if (data.address !== undefined) {
            await this.fill(this.addressInput, data.address);
        }
    }

    async save(): Promise<void> {
        await this.click(this.saveButton);
    }

    async discard(): Promise<void> {
        await this.click(this.discardButton);
    }

    getSearchInput(): Locator {
        return this.searchInput;
    }

    getNewButton(): Locator {
        return this.newButton;
    }

    getSaveButton(): Locator {
        return this.saveButton;
    }

    getDiscardButton(): Locator {
        return this.discardButton;
    }

    getPatientNameInput(): Locator {
        return this.patientNameInput;
    }

    getPhoneInput(): Locator {
        return this.phoneInput;
    }

    getEmailInput(): Locator {
        return this.emailInput;
    }

    getAddressInput(): Locator {
        return this.addressInput;
    }

    getPatientUhidHeader(): Locator {
        return this.patientUhidHeader;
    }

    getPatientNameHeader(): Locator {
        return this.patientNameHeader;
    }

    getPatientPhoneHeader(): Locator {
        return this.patientPhoneHeader;
    }

    getPatientEmailHeader(): Locator {
        return this.patientEmailHeader;
    }

    getRowByText(text: string): Locator {
        return this.page.getByRole('row', { name: new RegExp(text, 'i') });
    }
}

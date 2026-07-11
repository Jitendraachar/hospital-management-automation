import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { getBaseUrl } from '../helpers/env';

export interface DoctorFormData {
    name: string;
    specialization?: string;
    experienceYears?: string;
    phone?: string;
    email?: string;
    address?: string;
}

export class DoctorPage extends BasePage {
    private readonly newButton: Locator;
    private readonly searchInput: Locator;
    private readonly searchOptionsButton: Locator;
    private readonly saveButton: Locator;
    private readonly discardButton: Locator;
    private readonly actionsMenuButton: Locator;
    private readonly duplicateMenuItem: Locator;
    private readonly deleteMenuItem: Locator;

    private readonly nameInput: Locator;
    private readonly specializationInput: Locator;
    private readonly experienceYearsInput: Locator;
    private readonly phoneInput: Locator;
    private readonly emailInput: Locator;
    private readonly addressInput: Locator;

    private readonly nameHeader: Locator;
    private readonly specializationHeader: Locator;
    private readonly experienceHeader: Locator;
    private readonly phoneHeader: Locator;

    private readonly experiencedDoctorsFilterOption: Locator;
    private readonly specializationGroupByOption: Locator;
    private readonly saveCurrentSearchButton: Locator;

    constructor(page: Page) {
        super(page);

        this.newButton = page.getByRole('button', { name: 'New' }).first();
        this.searchInput = page.getByRole('searchbox', { name: 'Search...' });
        this.searchOptionsButton = page.getByRole('button', { name: '' }).first();
        this.saveButton = page.getByRole('button', { name: /Save manually|Save/i }).first();
        this.discardButton = page.getByRole('button', { name: /Discard all changes|Discard/i }).first();
        this.actionsMenuButton = page.getByRole('button', { name: 'Actions menu' }).first();
        this.duplicateMenuItem = page.getByRole('menuitem', { name: /Duplicate/i }).first();
        this.deleteMenuItem = page.getByRole('menuitem', { name: /Delete/i }).first();

        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.specializationInput = page.getByRole('textbox', { name: 'Specialization' });
        this.experienceYearsInput = page.getByRole('textbox', { name: 'Experience (Years)' });
        this.phoneInput = page.getByRole('textbox', { name: 'Phone' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.addressInput = page.getByRole('textbox', { name: 'Address' });

        this.nameHeader = page.getByRole('columnheader', { name: /^Name/i });
        this.specializationHeader = page.getByRole('columnheader', { name: /^Specialization/i });
        this.experienceHeader = page.getByRole('columnheader', { name: /Experience \(Years\)/i });
        this.phoneHeader = page.getByRole('columnheader', { name: /^Phone/i });

        this.experiencedDoctorsFilterOption = page.getByRole('menuitemcheckbox', { name: /Experienced Doctors/i });
        this.specializationGroupByOption = page.getByRole('menuitemcheckbox', { name: /Specialization/i });
        this.saveCurrentSearchButton = page.getByRole('button', { name: /Save current search/i });
    }

    async openList(): Promise<void> {
        const url = new URL('/odoo/action-372/action-375', getBaseUrl()).toString();
        await this.navigate(url);
    }

    async expectListViewLoaded(): Promise<void> {
        await expect(this.newButton).toBeVisible();
        await expect(this.searchInput).toBeVisible();
        await expect(this.nameHeader).toBeVisible();
        await expect(this.specializationHeader).toBeVisible();
        await expect(this.experienceHeader).toBeVisible();
        await expect(this.phoneHeader).toBeVisible();
    }

    async clickNew(): Promise<void> {
        await this.click(this.newButton);
    }

    async fillDoctorForm(data: DoctorFormData): Promise<void> {
        await this.fill(this.nameInput, data.name);

        if (data.specialization !== undefined) {
            await this.fill(this.specializationInput, data.specialization);
        }

        if (data.experienceYears !== undefined) {
            await this.fill(this.experienceYearsInput, data.experienceYears);
        }

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

    async createDoctor(data: DoctorFormData): Promise<void> {
        await this.clickNew();
        await this.fillDoctorForm(data);
        await this.save();
    }

    async save(): Promise<void> {
        await this.click(this.saveButton);
    }

    async discard(): Promise<void> {
        await this.click(this.discardButton);
    }

    async search(term: string): Promise<void> {
        await this.fill(this.searchInput, term);
        await this.page.keyboard.press('Enter');
    }

    async clearSearch(): Promise<void> {
        await this.fill(this.searchInput, '');
        await this.page.keyboard.press('Enter');
    }

    async openDoctorByText(text: string): Promise<void> {
        await this.click(this.getRowByText(text));
    }

    async updatePhone(phone: string): Promise<void> {
        await this.fill(this.phoneInput, phone);
    }

    async updateEmail(email: string): Promise<void> {
        await this.fill(this.emailInput, email);
    }

    async openActionsMenu(): Promise<void> {
        await this.click(this.actionsMenuButton);
    }

    async duplicateFromActionsMenu(): Promise<void> {
        await this.openActionsMenu();
        await this.click(this.duplicateMenuItem);
    }

    async deleteFromActionsMenu(): Promise<void> {
        await this.openActionsMenu();
        await this.click(this.deleteMenuItem);

        const confirmDeleteButton = this.page.getByRole('button', {
            name: /Ok|OK|Confirm|Delete/i
        }).first();

        if (await confirmDeleteButton.isVisible({ timeout: 1500 }).catch(() => false)) {
            await this.click(confirmDeleteButton);
        }
    }

    async openSearchOptions(): Promise<void> {
        await this.click(this.searchOptionsButton);
    }

    async applyExperiencedDoctorsFilter(): Promise<void> {
        await this.openSearchOptions();
        await this.click(this.experiencedDoctorsFilterOption);
    }

    async applySpecializationGroupBy(): Promise<void> {
        await this.openSearchOptions();
        await this.click(this.specializationGroupByOption);
    }

    getRowByText(text: string): Locator {
        return this.page.getByRole('row', { name: new RegExp(text, 'i') });
    }

    getNameInput(): Locator {
        return this.nameInput;
    }

    getPhoneInput(): Locator {
        return this.phoneInput;
    }

    getEmailInput(): Locator {
        return this.emailInput;
    }

    getExperienceYearsInput(): Locator {
        return this.experienceYearsInput;
    }

    getSaveCurrentSearchButton(): Locator {
        return this.saveCurrentSearchButton;
    }
}

import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { getBaseUrl } from '../../helpers/env';

export interface PrescriptionMedicineLine {
    dosage?: string;
    duration?: string;
    notes?: string;
}

export interface PrescriptionFormData {
    patient?: string;
    appointment?: string;
    notes?: string;
    medicine?: PrescriptionMedicineLine;
}

export class PrescriptionPage extends BasePage {
    private readonly newButton: Locator;
    private readonly searchInput: Locator;
    private readonly searchOptionsButton: Locator;
    private readonly actionsMenuButton: Locator;

    private readonly saveButton: Locator;
    private readonly discardButton: Locator;
    private readonly printPrescriptionButton: Locator;

    private readonly referenceHeader: Locator;
    private readonly patientHeader: Locator;
    private readonly appointmentHeader: Locator;
    private readonly dateHeader: Locator;

    private readonly patientCombobox: Locator;
    private readonly appointmentCombobox: Locator;
    private readonly dateButton: Locator;
    private readonly addMedicineLineButton: Locator;
    private readonly deleteMedicineRowButton: Locator;
    private readonly prescriptionNotesInput: Locator;

    private readonly qtyInput: Locator;
    private readonly dosageInput: Locator;
    private readonly durationInput: Locator;
    private readonly lineNotesInput: Locator;

    private readonly customFilterMenuItem: Locator;
    private readonly groupByCombobox: Locator;
    private readonly saveCurrentSearchButton: Locator;

    private readonly duplicateMenuItem: Locator;
    private readonly deleteMenuItem: Locator;
    private readonly printReportMenuItem: Locator;

    constructor(page: Page) {
        super(page);

        this.newButton = page.getByRole('button', { name: 'New' }).first();
        this.searchInput = page.getByRole('searchbox', { name: 'Search...' });
        this.searchOptionsButton = page.getByRole('button', { name: /|▼|▾/ }).first();
        this.actionsMenuButton = page.getByRole('button', { name: 'Actions menu' }).first();

        this.saveButton = page.getByRole('button', { name: /Save manually|Save/i }).first();
        this.discardButton = page.getByRole('button', { name: /Discard all changes|Discard/i }).first();
        this.printPrescriptionButton = page.getByRole('button', { name: /Print Prescription/i }).first();

        this.referenceHeader = page.getByRole('columnheader', { name: /^Reference/ });
        this.patientHeader = page.getByRole('columnheader', { name: /^Patient/ });
        this.appointmentHeader = page.getByRole('columnheader', { name: /^Appointment/ });
        this.dateHeader = page.getByRole('columnheader', { name: /^Date/ });

        this.patientCombobox = page.getByRole('combobox', { name: 'Patient' });
        this.appointmentCombobox = page.getByRole('combobox', { name: 'Appointment' });
        this.dateButton = page.getByRole('button', { name: 'Date' }).first();
        this.addMedicineLineButton = page.getByRole('button', { name: 'Add a line' }).first();
        this.deleteMedicineRowButton = page.getByRole('button', { name: 'Delete row' }).first();
        this.prescriptionNotesInput = page.getByRole('textbox', {
            name: 'Type any long-form prescription instructions, observations, or doctor notes here.'
        });

        this.qtyInput = page.locator('tbody tr').nth(0).locator('input').first();
        this.dosageInput = page.locator('tbody tr').nth(0).locator('input').nth(1);
        this.durationInput = page.locator('tbody tr').nth(0).locator('input').nth(2);
        this.lineNotesInput = page.locator('tbody tr').nth(0).locator('input').nth(3);

        this.customFilterMenuItem = page.getByRole('menuitem', { name: 'Custom Filter...' });
        this.groupByCombobox = page.locator('[role="menu"] [role="combobox"]').first();
        this.saveCurrentSearchButton = page.getByRole('button', { name: 'Save current search' });

        this.duplicateMenuItem = page.getByRole('menuitem', { name: /Duplicate/i }).first();
        this.deleteMenuItem = page.getByRole('menuitem', { name: /Delete/i }).first();
        this.printReportMenuItem = page.getByRole('menuitem', { name: /Prescription/i }).first();
    }

    async openList(): Promise<void> {
        const url = new URL('/odoo/action-372/action-377', getBaseUrl()).toString();
        await this.navigate(url);
    }

    async expectListViewLoaded(): Promise<void> {
        await expect(this.newButton).toBeVisible();
        await expect(this.searchInput).toBeVisible();
        await expect(this.referenceHeader).toBeVisible();
        await expect(this.patientHeader).toBeVisible();
        await expect(this.appointmentHeader).toBeVisible();
        await expect(this.dateHeader).toBeVisible();
    }

    async clickNew(): Promise<void> {
        await this.click(this.newButton);
    }

    async search(term: string): Promise<void> {
        await this.fill(this.searchInput, term);
        await this.page.keyboard.press('Enter');
    }

    async clearSearch(): Promise<void> {
        await this.fill(this.searchInput, '');
        await this.page.keyboard.press('Enter');
    }

    async openSearchOptions(): Promise<void> {
        await this.click(this.searchOptionsButton);
    }

    async expectSearchOptionsVisible(): Promise<void> {
        await expect(this.customFilterMenuItem).toBeVisible();
        await expect(this.groupByCombobox).toBeVisible();
        await expect(this.saveCurrentSearchButton).toBeVisible();
    }

    async openCustomFilter(): Promise<void> {
        await this.openSearchOptions();
        await this.click(this.customFilterMenuItem);
    }

    async openFormActionsMenu(): Promise<void> {
        await this.click(this.actionsMenuButton);
    }

    async save(): Promise<void> {
        await this.click(this.saveButton);
    }

    async discard(): Promise<void> {
        await this.click(this.discardButton);
    }

    async fillForm(data: PrescriptionFormData): Promise<void> {
        if (data.patient) {
            await this.fill(this.patientCombobox, data.patient);
            await this.page.keyboard.press('Enter');
        }

        if (data.appointment) {
            await this.fill(this.appointmentCombobox, data.appointment);
            await this.page.keyboard.press('Enter');
        }

        if (data.medicine?.dosage !== undefined) {
            await this.fill(this.dosageInput, data.medicine.dosage);
        }

        if (data.medicine?.duration !== undefined) {
            await this.fill(this.durationInput, data.medicine.duration);
        }

        if (data.medicine?.notes !== undefined) {
            await this.fill(this.lineNotesInput, data.medicine.notes);
        }

        if (data.notes !== undefined) {
            await this.fill(this.prescriptionNotesInput, data.notes);
        }
    }

    async expectCreateFormLoaded(): Promise<void> {
        await expect(this.printPrescriptionButton).toBeVisible();
        await expect(this.patientCombobox).toBeVisible();
        await expect(this.appointmentCombobox).toBeVisible();
        await expect(this.dateButton).toBeVisible();
        await expect(this.addMedicineLineButton).toBeVisible();
        await expect(this.prescriptionNotesInput).toBeVisible();
    }

    async addMedicineLine(): Promise<void> {
        await this.click(this.addMedicineLineButton);
    }

    async deleteMedicineLine(): Promise<void> {
        await this.click(this.deleteMedicineRowButton);
    }

    async clickPrintPrescription(): Promise<void> {
        await this.click(this.printPrescriptionButton);
    }

    async hasAnyListRecord(): Promise<boolean> {
        const rows = this.page.locator('table tbody tr');
        const count = await rows.count();

        for (let index = 0; index < count; index++) {
            const text = (await rows.nth(index).textContent())?.trim() ?? '';
            if (text.length > 0) {
                return true;
            }
        }

        return false;
    }

    async openFirstListRecord(): Promise<void> {
        const rows = this.page.locator('table tbody tr');
        const count = await rows.count();

        for (let index = 0; index < count; index++) {
            const row = rows.nth(index);
            const text = (await row.textContent())?.trim() ?? '';
            if (text.length > 0) {
                await this.click(row);
                return;
            }
        }

        throw new Error('No non-empty prescription record row found to open.');
    }

    async deleteOpenedRecordIfAvailable(): Promise<boolean> {
        await this.openFormActionsMenu();

        if (await this.deleteMenuItem.isVisible({ timeout: 1500 }).catch(() => false)) {
            await this.click(this.deleteMenuItem);

            const confirmDeleteButton = this.page
                .getByRole('button', { name: /Ok|OK|Confirm|Delete/i })
                .first();

            if (await confirmDeleteButton.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.click(confirmDeleteButton);
            }

            return true;
        }

        return false;
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

    getPrintPrescriptionButton(): Locator {
        return this.printPrescriptionButton;
    }

    getPatientCombobox(): Locator {
        return this.patientCombobox;
    }

    getAppointmentCombobox(): Locator {
        return this.appointmentCombobox;
    }

    getPrescriptionNotesInput(): Locator {
        return this.prescriptionNotesInput;
    }

    getCustomFilterMenuItem(): Locator {
        return this.customFilterMenuItem;
    }

    getGroupByCombobox(): Locator {
        return this.groupByCombobox;
    }

    getSaveCurrentSearchButton(): Locator {
        return this.saveCurrentSearchButton;
    }

    getDuplicateMenuItem(): Locator {
        return this.duplicateMenuItem;
    }

    getDeleteMenuItem(): Locator {
        return this.deleteMenuItem;
    }

    getPrintReportMenuItem(): Locator {
        return this.printReportMenuItem;
    }

    getQtyInput(): Locator {
        return this.qtyInput;
    }

    getDosageInput(): Locator {
        return this.dosageInput;
    }

    getDurationInput(): Locator {
        return this.durationInput;
    }

    getLineNotesInput(): Locator {
        return this.lineNotesInput;
    }

    getDeleteMedicineRowButton(): Locator {
        return this.deleteMedicineRowButton;
    }

    getRowByText(text: string): Locator {
        return this.page.getByRole('row', { name: new RegExp(text, 'i') });
    }
}

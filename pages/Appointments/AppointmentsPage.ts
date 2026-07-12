import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { getBaseUrl } from '../../helpers/env';

export interface AppointmentFormData {
    doctor?: string;
    patient?: string;
    date?: string;
    time?: string;
    consultationFee?: string;
    notes?: string;
}

export class AppointmentsPage extends BasePage {
    private readonly newButton: Locator;
    private readonly saveButton: Locator;
    private readonly discardButton: Locator;
    private readonly searchInput: Locator;
    private readonly searchOptionsButton: Locator;
    private readonly actionsMenuButton: Locator;

    private readonly appointmentNoHeader: Locator;
    private readonly patientHeader: Locator;
    private readonly doctorHeader: Locator;
    private readonly dateHeader: Locator;
    private readonly statusHeader: Locator;

    private readonly doctorCombobox: Locator;
    private readonly patientCombobox: Locator;
    private readonly dateTextbox: Locator;
    private readonly timeTextbox: Locator;
    private readonly consultationFeeTextbox: Locator;
    private readonly notesTextbox: Locator;

    private readonly confirmButton: Locator;
    private readonly cancelButton: Locator;
    private readonly createBillingButton: Locator;
    private readonly printReceiptButton: Locator;

    private readonly draftFilterMenuItem: Locator;
    private readonly confirmedFilterMenuItem: Locator;
    private readonly doneFilterMenuItem: Locator;
    private readonly customFilterMenuItem: Locator;
    private readonly groupByStatusMenuItem: Locator;

    private readonly printReportMenuItem: Locator;
    private readonly duplicateMenuItem: Locator;
    private readonly deleteMenuItem: Locator;

    private readonly missingRequiredFieldsAlert: Locator;

    constructor(page: Page) {
        super(page);

        this.newButton = page.getByRole('button', { name: 'New' }).first();
        this.saveButton = page.getByRole('button', { name: /Save manually|Save/i }).first();
        this.discardButton = page.getByRole('button', { name: /Discard all changes|Discard/i }).first();
        this.searchInput = page.getByRole('searchbox', { name: 'Search...' });
        this.searchOptionsButton = page.getByRole('button', { name: /|▼|▾/ }).first();
        this.actionsMenuButton = page.getByRole('button', { name: 'Actions menu' }).first();

        this.appointmentNoHeader = page.getByRole('columnheader', { name: /^Appointment No/ });
        this.patientHeader = page.getByRole('columnheader', { name: /^Patient/ });
        this.doctorHeader = page.getByRole('columnheader', { name: /^Doctor/ });
        this.dateHeader = page.getByRole('columnheader', { name: /^Date/ });
        this.statusHeader = page.getByRole('columnheader', { name: /^Status/ });

        this.doctorCombobox = page.getByRole('combobox', { name: 'Doctor' }).first();
        this.patientCombobox = page.getByRole('combobox', { name: 'Patient' }).first();
        this.dateTextbox = page.getByRole('textbox', { name: 'Date' }).first();
        this.timeTextbox = page.getByRole('textbox', { name: /Time \(HH:MM\)/i }).first();
        this.consultationFeeTextbox = page.getByRole('textbox', { name: 'Consultation Fee' }).first();
        this.notesTextbox = page.getByRole('textbox', {
            name: 'Additional notes about this appointment…'
        });

        this.confirmButton = page.getByRole('button', { name: /^Confirm$/ }).first();
        this.cancelButton = page.getByRole('button', { name: /^Cancel$/ }).first();
        this.createBillingButton = page.getByRole('button', { name: /Create Billing/i }).first();
        this.printReceiptButton = page.getByRole('button', { name: /Print Receipt/i }).first();

        this.draftFilterMenuItem = page.getByRole('menuitemcheckbox', { name: /^Draft$/ }).first();
        this.confirmedFilterMenuItem = page.getByRole('menuitemcheckbox', { name: /^Confirmed$/ }).first();
        this.doneFilterMenuItem = page.getByRole('menuitemcheckbox', { name: /^Done$/ }).first();
        this.customFilterMenuItem = page.getByRole('menuitem', { name: 'Custom Filter...' }).first();
        this.groupByStatusMenuItem = page.getByRole('menuitemcheckbox', { name: /^Status$/ }).first();

        this.printReportMenuItem = page.getByRole('menuitem', { name: /Appointment Receipt/i }).first();
        this.duplicateMenuItem = page.getByRole('menuitem', { name: /Duplicate/i }).first();
        this.deleteMenuItem = page.getByRole('menuitem', { name: /Delete/i }).first();

        this.missingRequiredFieldsAlert = page.getByRole('alert').filter({
            hasText: 'Missing required fields'
        });
    }

    async openList(): Promise<void> {
        const url = new URL('/odoo/action-372/action-376', getBaseUrl()).toString();
        await this.navigate(url);
    }

    async expectListViewLoaded(): Promise<void> {
        await expect(this.newButton).toBeVisible();
        await expect(this.searchInput).toBeVisible();
        await expect(this.appointmentNoHeader).toBeVisible();
        await expect(this.patientHeader).toBeVisible();
        await expect(this.doctorHeader).toBeVisible();
        await expect(this.dateHeader).toBeVisible();
        await expect(this.statusHeader).toBeVisible();
    }

    async clickNew(): Promise<void> {
        await this.click(this.newButton);
    }

    async save(): Promise<void> {
        await this.click(this.saveButton);
    }

    async discard(): Promise<void> {
        await this.click(this.discardButton);
    }

    async expectCreateFormLoaded(): Promise<void> {
        await expect(this.saveButton).toBeVisible();
        await expect(this.doctorCombobox).toBeVisible();
        await expect(this.dateTextbox).toBeVisible();
        await expect(this.timeTextbox).toBeVisible();
        await expect(this.consultationFeeTextbox).toBeVisible();
        await expect(this.patientCombobox).toBeVisible();
        await expect(this.printReceiptButton).toBeVisible();
    }

    async fillForm(data: AppointmentFormData): Promise<void> {
        if (data.doctor) {
            await this.fill(this.doctorCombobox, data.doctor);
            await this.page.keyboard.press('Enter');
        }

        if (data.patient) {
            await this.fill(this.patientCombobox, data.patient);
            await this.page.keyboard.press('Enter');
        }

        if (data.date !== undefined) {
            await this.fill(this.dateTextbox, data.date);
            await this.page.keyboard.press('Enter');
        }

        if (data.time !== undefined) {
            await this.fill(this.timeTextbox, data.time);
        }

        if (data.consultationFee !== undefined) {
            await this.fill(this.consultationFeeTextbox, data.consultationFee);
        }

        if (data.notes !== undefined) {
            await this.fill(this.notesTextbox, data.notes);
        }
    }

    async expectMissingRequiredFieldValidation(): Promise<void> {
        await expect(this.missingRequiredFieldsAlert).toBeVisible();
    }

    async search(term: string): Promise<void> {
        await this.fill(this.searchInput, term);
    }

    async applyAppointmentNumberSearch(term: string): Promise<void> {
        await this.search(term);

        const searchAppointmentMenuItem = this.page.getByRole('menuitem', {
            name: new RegExp(`Search Appointment No for:\\s*${term}`, 'i')
        });

        if (await searchAppointmentMenuItem.isVisible({ timeout: 2000 }).catch(() => false)) {
            await this.click(searchAppointmentMenuItem);
            return;
        }

        await this.page.keyboard.press('Enter');
    }

    async openSearchOptions(): Promise<void> {
        await this.click(this.searchOptionsButton);
    }

    async applyDraftFilter(): Promise<void> {
        await this.openSearchOptions();
        await this.click(this.draftFilterMenuItem);
    }

    async applyConfirmedFilter(): Promise<void> {
        await this.openSearchOptions();
        await this.click(this.confirmedFilterMenuItem);
    }

    async applyDoneFilter(): Promise<void> {
        await this.openSearchOptions();
        await this.click(this.doneFilterMenuItem);
    }

    async expectSearchOptionsVisible(): Promise<void> {
        await expect(this.draftFilterMenuItem).toBeVisible();
        await expect(this.customFilterMenuItem).toBeVisible();
        await expect(this.groupByStatusMenuItem).toBeVisible();
    }

    async openRecordByAppointmentNo(appointmentNo: string): Promise<void> {
        const recordCell = this.page.getByRole('cell', { name: appointmentNo, exact: true }).first();
        await this.click(recordCell);
    }

    async openFirstDraftRecord(): Promise<string> {
        const firstDraftRow = this.page.locator('tbody tr').filter({ hasText: 'Draft' }).first();
        await expect(firstDraftRow).toBeVisible();

        const rowText = (await firstDraftRow.textContent()) ?? '';
        const appointmentNo = rowText.match(/APT\/\d+/i)?.[0] ?? '';

        const appointmentCell = firstDraftRow.locator('td').nth(1);
        await this.click(appointmentCell);

        return appointmentNo;
    }

    async openFormActionsMenu(): Promise<void> {
        await this.click(this.actionsMenuButton);
    }

    async expectFormActionsMenuOptions(): Promise<void> {
        await expect(this.printReportMenuItem).toBeVisible();
        await expect(this.duplicateMenuItem).toBeVisible();
        await expect(this.deleteMenuItem).toBeVisible();
    }

    async openPrintFromActionsMenu(): Promise<void> {
        await this.openFormActionsMenu();
        await this.click(this.printReportMenuItem);
    }

    async clickPrintReceipt(): Promise<void> {
        await this.click(this.printReceiptButton);
    }

    async clickConfirm(): Promise<void> {
        await this.click(this.confirmButton);
    }

    async clickCancel(): Promise<void> {
        await this.click(this.cancelButton);
    }

    getSearchInput(): Locator {
        return this.searchInput;
    }

    getSaveButton(): Locator {
        return this.saveButton;
    }

    getDoctorCombobox(): Locator {
        return this.doctorCombobox;
    }

    getDateTextbox(): Locator {
        return this.dateTextbox;
    }

    getConsultationFeeTextbox(): Locator {
        return this.consultationFeeTextbox;
    }

    getNotesTextbox(): Locator {
        return this.notesTextbox;
    }

    getCreateBillingButton(): Locator {
        return this.createBillingButton;
    }

    getPrintReceiptButton(): Locator {
        return this.printReceiptButton;
    }

    getRowByText(text: string): Locator {
        return this.page.getByRole('row', { name: new RegExp(text, 'i') });
    }

    getStatusPill(status: 'Draft' | 'Confirmed' | 'Done' | 'Cancelled'): Locator {
        return this.page.getByText(status, { exact: true }).first();
    }
}
